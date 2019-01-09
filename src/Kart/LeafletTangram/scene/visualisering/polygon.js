import tinycolor from "tinycolor2";
import sysconfig from "../../../../config";
import opplyst from "./palette/opplyst";

function drawAll(drawArgs) {
  const { kode, barn, farge, opplystKode, visBarn, visEtiketter } = drawArgs;
  const layer = {
    data: { source: kode, layer: kode }
  };
  if (visBarn) {
    Object.keys(barn).forEach(barnkode => {
      const dac = barn[barnkode];
      if (Object.hasOwnProperty("erSynlig") && !dac.erSynlig) return;
      const visEtiketter = barnkode === opplystKode;
      layer[barnkode] = draw({
        kode: barnkode,
        forelderkode: kode,
        farge: dac.farge,
        opplystKode: opplystKode,
        visEtiketter: visEtiketter
      });
    });
  } else
    layer[kode] = draw({
      kode: kode,
      forelderkode: kode,
      farge: farge,
      opplystKode: opplystKode,
      visEtiketter: visEtiketter
    });
  return layer;
}

function draw(args) {
  let { kode, forelderkode, farge, opplystKode, visEtiketter } = args;
  farge = opplyst(kode, opplystKode, farge);
  const layer = {
    draw: {
      mu_polygons: {
        order: 800,
        color: farge
      },
      lines: {
        order: 800,
        color: tinycolor(farge)
          .darken(30)
          .toHexString(),
        width: "1.0px"
      },
      po: {
        size: 500,
        collide: true,
        color: farge
        //texture: `https://firebasestorage.googleapis.com/v0/b/grunnkart.appspot.com/o/bilde%2Favatar%2F40%2F${kode}.png?alt=media`,
      }
    }
  };
  if (kode !== forelderkode) layer.filter = { code: kode };
  if (kode === opplystKode) {
    const lines = layer.draw.lines;
    lines.width = "2px";
  }
  if (visEtiketter) {
    layer.draw.text = {
      text_source: ["name", "title"],
      font: {
        family: "Roboto",
        fill: "hsla(0, 0%, 100%, 1.0)",
        stroke: { color: "hsla(0, 0%, 0%, 0.7)", width: 2 },
        size: "13px"
      }
    };
  }
  return layer;
}

function lagSource(kode, bbox, zoom) {
  return sysconfig.createTileSource(
    `${kode.replace(/-/g, "/")}/vector.3857`,
    "MVT",
    zoom,
    bbox
  );
}

export default { drawAll, lagSource };
