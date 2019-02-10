import bkmal from "../mal/openStreetMap";
import sysconfig from "../../../../config";

function override(o, key, value) {
  if (value === null) return;
  o[key] = value;
}

function recurse(o, style, lag, kode) {
  if (!o) return;
  if (!(o instanceof Object)) return;
  const draw = o.draw;
  if (draw) {
    const dstyle = draw[style];
    if (dstyle) {
      override(dstyle, "color", lag[kode + "_farge"]);
      const outline = draw[style].outline;
      if (outline) {
        override(outline, "color", lag[kode + "_outline_farge"]);
        override(outline, "width", outline ? lag[kode + "_outline_width"] : 0);
      }
    }
    return;
  }
  Object.keys(o).forEach(k => {
    const child = o[k];
    recurse(child, style, lag, kode);
  });
}

function opprett(kode, lag, layer, style) {
  if (!lag[kode]) return;
  layer = layer[kode];
  recurse(layer, style, lag, kode);
}

function opprettTekst(kode, lag, layer) {
  if (!lag[kode]) return;
  layer = layer[kode];
  const font = layer.draw.text.font;
  font.fill = lag[kode + "_farge"];
  const stroke = lag[kode + "_stroke"];
  font.stroke.color = lag[kode + "_stroke_farge"];
  font.stroke.width = stroke ? lag[kode + "_stroke_width"] : 0;
}

function drawAll(drawArgs) {
  const lag = drawArgs.kartformat.osm;
  const { opplystKode } = drawArgs;
  const layer = bkmal;
  opprett("kommunegrense", lag, layer, "boundary");
  opprett("fylkesgrense", lag, layer, "boundary");
  opprett("landegrense", lag, layer, "boundary");
  opprett("vann", lag, layer, "polygons");
  opprett("transport", lag, layer, "lines");
  if (!opplystKode) {
    opprettTekst("transport_navn", lag, layer);
    opprettTekst("sted_navn", lag, layer);
    opprettTekst("vann_navn", lag, layer);
  }
  return layer;
}

function lagSource(url, bbox, zoom) {
  return sysconfig.createTileSource(
    sysconfig.storageUrl + "Bakgrunnskart/OpenStreetMap/polygon.3857.mbtiles",
    "MVT",
    [0, 14]
  );
}

export default { drawAll, lagSource };
