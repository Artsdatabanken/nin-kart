import tinycolor from "tinycolor2";
import sysconfig from "Funksjoner/config";
import opplyst from "Funksjoner/palette/opplyst";

function drawAll(drawArgs) {
  const {
    kode,
    barn,
    farge,
    opplystKode,
    tegn,
    visBarn,
    visEtiketter
  } = drawArgs;
  const layer = {};
  if (visBarn) {
    barn.forEach(dac => {
      let barnkode = dac.kode;
      if (dac.hasOwnProperty("erSynlig") && !dac.erSynlig) return;
      const visEtiketter = barnkode === opplystKode;
      layer[barnkode] = drawLines({
        kode: barnkode,
        forelderkode: kode,
        farge: dac.farge,
        opplystKode: opplystKode,
        visEtiketter: visEtiketter
      });
      if (tegn.punkt) {
        const points = drawPoints({
          kode: barnkode,
          forelderkode: kode,
          farge: dac.farge,
          opplystKode: opplystKode,
          visEtiketter: false,
          tegn
        });
        //        points.filter["$zoom"] = { min: 0, max: 6 }
        layer[barnkode + "_points"] = points;
      }
    });
  } else
    layer[sysconfig.hack(kode)] = drawLines({
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

function drawLines(args) {
  let { kode, farge, opplystKode, visEtiketter } = args;
  farge = opplyst(kode, opplystKode, farge);
  const layer = drawBase(args);
  layer.draw.lines = {
    order: 800,
    color: tinycolor(farge)
      .darken(50)
      .toHexString(),
    width: "1.0px"
  };
  layer.draw.mu_polygons = {
    order: 800,
    blend: "multiply",
    color: tinycolor(farge)
      //          .darken(30)
      //        .saturate(60)
      .toHexString()
  };

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

function drawPoints(args) {
  let { kode, farge, opplystKode } = args;
  farge = opplyst(kode, opplystKode, farge);
  const layer = drawBase(args);
  layer.draw.translucent_points = {
    order: 850,
    size: args.tegn.punkt,
    collide: false,
    color: farge,
    //    color: [[0,farge], [8,"#f00"],[10, "#ffffff"]],
    interactive: true
    /*    outline: {
      width: [[0,2],[10,0]],
      color: "rgba(0,0,0,30%)"
//      color: [[0,"rgba(0,0,0,60%)"],[10, "rgba(0,0,0,0%)"]]
//      color: [[0,"rgba(0,0,0,30%)"], [10, "#ffffff"]]
    }
//        filter: { $geometry: "point" } 
*/
  };

  return layer;
}

function drawBase(args) {
  let { kode, visEtiketter } = args;
  const layer = {
    draw: {}
  };
  layer.filter = { kode: sysconfig.hack(kode) };
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
