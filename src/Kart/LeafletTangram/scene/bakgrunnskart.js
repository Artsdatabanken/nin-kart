// @flow
import bkmal from "./mal/bakgrunnskart";

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
        override(outline, "width", lag[kode + "_outline_width"]);
      }
    }
    return;
  }
  Object.keys(o).forEach(k => {
    const child = o[k];
    recurse(child, style, lag, kode);
  });
}

function opprett(kode, lag, config, style) {
  if (!lag[kode]) return;
  let mal = bkmal[kode];
  recurse(mal, style, lag, kode);
  config.layers[kode] = mal;
}

function opprettTekst(kode, lag, config, style) {
  if (!lag[kode]) return;
  let mal = bkmal[kode];

  const font = mal.draw.text.font;
  font.fill = lag[kode + "_farge"];
  font.stroke.color = lag[kode + "_stroke_farge"];
  font.stroke.width = lag[kode + "_stroke_width"];
  config.layers[kode] = mal;
}

function lagBakgrunnskart(lag, opplystKode, config) {
  opprett("kommunegrense", lag, config, "boundary");
  opprett("fylkesgrense", lag, config, "boundary");
  opprett("landegrense", lag, config, "boundary");
  opprett("vann", lag, config, "polygons");
  opprett("vannvei", lag, config, "lines");
  opprett("transport", lag, config, "lines");
  if (!opplystKode) {
    opprettTekst("transport_navn", lag, config);
    opprettTekst("sted_navn", lag, config);
    opprettTekst("vann_navn", lag, config);
  }
}

export { lagBakgrunnskart };
