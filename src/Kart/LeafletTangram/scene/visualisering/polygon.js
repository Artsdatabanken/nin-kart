import tinycolor from "tinycolor2";
import sysconfig from "Funksjoner/config";
import opplyst from "Funksjoner/palette/opplyst";

function drawAll(drawArgs) {
  const { kode, barn, farge, opplystKode, visBarn, visEtiketter } = drawArgs;
  const layer = {};
  if (visBarn) {
    barn.forEach(dac => {
      let barnkode = dac.kode;
      if (dac.hasOwnProperty("erSynlig") && !dac.erSynlig) return;
      const visEtiketter = barnkode === opplystKode;
      layer[barnkode] = draw({
        kode: barnkode,
        forelderkode: kode,
        farge: dac.farge,
        opplystKode: opplystKode,
        visEtiketter: visEtiketter
      });
    });
  }
  layer[sysconfig.hack(kode)] = draw({
    //    layer[sysconfig.hack(kode)] = draw({
    kode: kode,
    forelderkode: kode,
    farge: farge,
    opplystKode: opplystKode,
    visEtiketter: visEtiketter
  });

  return {
    [kode]: { layer, data: { source: kode, layer: "polygons" } }
  };
}

function draw(args) {
  let { kode, farge, opplystKode, visEtiketter } = args;
  farge = opplyst(kode, opplystKode, farge);
  const layer = {
    draw: {
      mu_polygons: {
        order: 800,
        color: tinycolor(farge)
          //          .darken(30)
          //        .saturate(60)
          .toHexString()
      },
      lines: {
        order: 800,
        color: tinycolor(farge)
          .darken(50)
          .toHexString(),
        width: "1.0px"
      },
      po: {
        size: 500,
        collide: true,
        color: farge
      }
    }
  };
  //if (kode !== forelderkode)
  layer.filter = { code: sysconfig.hack(kode) };
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

function lagSource({ url, zoom }, { bbox }) {
  return sysconfig.createTileSource(url, "MVT", zoom, bbox);
}

export default { drawAll, lagSource };
