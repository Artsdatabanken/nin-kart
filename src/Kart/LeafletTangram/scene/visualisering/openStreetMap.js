import mal from "../mal/openStreetMap";
import sysconfig from "Funksjoner/config";

function override(o, key, value) {
  if (value === null) return;
  o[key] = value;
}

function recurse(o, style, kf, kode) {
  if (!o) return;
  if (!(o instanceof Object)) return;
  const draw = o.draw;
  if (draw) {
    const dstyle = draw[style];
    if (dstyle) {
      override(dstyle, "color", kf[kode + "_farge"]);
      const outline = draw[style].outline;
      if (outline) {
        override(outline, "color", kf[kode + "_outline_farge"]);
        override(outline, "width", outline ? kf[kode + "_outline_width"] : 0);
      }
    }
    return;
  }
  Object.keys(o).forEach(k => {
    const child = o[k];
    recurse(child, style, kf, kode);
  });
}

function opprett(kode, kf, layers, style) {
  if (!kf[kode]) return;
  const layer = Object.assign({}, mal[kode]);
  recurse(layer, style, kf, kode);
  layers[kode] = layer;
}

function opprettTekst(kode, kf, layers) {
  if (!kf[kode]) {
    return;
  }
  const layer = Object.assign({}, mal[kode]);
  const font = layer.draw.text.font;
  font.fill = kf[kode + "_farge"];
  font.stroke.color = kf[kode + "_stroke_farge"];
  font.stroke.width = kf[kode + "_stroke_width"];
  layers[kode] = layer;
}

function drawAll(drawArgs) {
  const kf = drawArgs.format;
  const { opplystKode } = drawArgs;
  const layers = {};
  opprett("kommunegrense", kf, layers, "boundary");
  opprett("fylkesgrense", kf, layers, "boundary");
  opprett("landegrense", kf, layers, "boundary");
  opprett("vann", kf, layers, "polygons");
  opprett("transport", kf, layers, "lines");
  if (!opplystKode) {
    opprettTekst("transport_navn", kf, layers);
    opprettTekst("sted_navn", kf, layers);
    opprettTekst("vann_navn", kf, layers);
  }
  return layers;
}

function lagSource({ url, zoom }, { bbox }) {
  return sysconfig.createTileSource(
    sysconfig.storageUrl +
      "Basiskart/OpenStreetMap/osm-2017-07-03-v3.6.1-planet.mbtiles",
    "MVT",
    [0, 14],
    [[-81.05195, -180], [81.05195, 179]]
  );
}

export default { drawAll, lagSource };
