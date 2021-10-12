import sysconfig from "../../../../Funksjoner/config";
import hentFarge from "../../../../Funksjoner/palette/opplyst";

function drawAll(drawArgs) {
  const { blendmode, kode, barn, farge, opplyst, tegn, visBarn, visEtiketter } =
    drawArgs;
  const layer = {};
  if (visBarn) {
    barn.forEach((dac) => {
      let barnkode = dac.kode;
      if (dac.hasOwnProperty("erSynlig") && !dac.erSynlig) return;
      const visEtiketter = barnkode === opplyst;
      layer[barnkode] = drawLines({
        blendmode: blendmode,
        kode: dac.kode,
        kartkode: dac.kartkode,
        forelderkode: kode,
        farge: dac.farge,
        opplyst: opplyst,
        visEtiketter: visEtiketter,
      });
      if (tegn && tegn.punkt) {
        const points = drawPoints({
          kode: dac.kode,
          kartkode: dac.kartkode,
          forelderkode: kode,
          farge: dac.farge,
          opplyst: opplyst,
          visEtiketter: false,
          tegn,
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
      opplyst: opplyst,
      visEtiketter: visEtiketter,
    });

  return {
    [kode]: { layer, data: { source: kode, layer: "polygons" } },
  };
}

function drawLines(args) {
  let { kode, farge, opplyst, visEtiketter } = args;
  farge = hentFarge(kode, opplyst, farge);
  const layer = drawBase(args);
  layer.draw[args.blendmode + "_lines"] = {
    order: 800,
    color: farge.toHexString(), //.clone().darken(kode === opplyst ? 30 : 0).toHexString(),
    width: kode === opplyst ? "2px" : "1px",
  };
  layer.draw[args.blendmode + "_polygons"] = {
    order: 700,
    color: farge.toHexString(),
  };
  if (visEtiketter) {
    layer.draw.text = {
      text_source: ["name", "title"],
      font: {
        family: "Roboto",
        fill: "hsla(0, 0%, 100%, 1.0)",
        stroke: { color: "hsla(0, 0%, 0%, 0.7)", width: 2 },
        size: "13px",
      },
    };
  }
  return layer;
}

function drawPoints(args) {
  let { kode, farge, opplyst } = args;
  farge = hentFarge(kode, opplyst, farge);
  const layer = drawBase(args);
  layer.draw.translucent_points = {
    order: 850,
    size: args.tegn.punkt,
    collide: false,
    color: farge,
    //    color: [[0,farge], [8,"#f00"],[10, "#ffffff"]],
    interactive: true,
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
  let { kode, kartkode, visEtiketter } = args;
  const layer = {
    draw: {},
  };
  if (kode.indexOf("NN-NA-TI") === 0 || kode.indexOf("NN-NA-BS") === 0)
    // Eksakt treff eller fra vilkårlig undernivå
    layer.filter = `function(feature) {return feature.kode==="${kartkode}" || feature.kode.indexOf("${kartkode}-")===0}`;
  else layer.filter = { kode: sysconfig.hack(kode) };
  //console.log('xxx', layer.filter)
  if (true || visEtiketter) {
    layer.draw.text = {
      text_source: ["name", "title"],
      font: {
        family: "Roboto",
        fill: "hsla(0, 0%, 100%, 1.0)",
        stroke: { color: "hsla(0, 0%, 0%, 0.7)", width: 2 },
        size: "13px",
      },
    };
  }
  return layer;
}

function lagSource({ url, zoom }, { bbox }) {
  return sysconfig.createTileSource(url, "MVT", zoom, bbox);
}

const polygonObject = { drawAll, lagSource };

export default polygonObject;
