import sysconfig from "../../../../config";
import tinycolor from "tinycolor2";

function drawAll(drawArgs) {
  const layer = {
    [drawArgs.kode]: {
      data: { source: drawArgs.kode },
      draw: {
        ruter: {
          order: 700
        }
      }
    }
  };
  return layer;
}

function lagStyle(format, drawArgs) {
  let farge = tinycolor(drawArgs.farge);
  if (drawArgs.opplystKode && drawArgs.opplystKode !== drawArgs.kode)
    farge = farge.lighten(20);
  const fargear = [farge._r / 255, farge._g / 255, farge._b / 255, farge._a];
  const gradient = {
    base: "raster",
    blend: "multiply",
    shaders: {
      uniforms: { farge: fargear },
      blocks: {
        color: `
        float value = 1.-sampleRaster(0).r;
        vec4 transparent = vec4(1.);
        float v = value*value;
        color = mix(farge, transparent, v);`
      }
    }
  };
  return {
    name: "ruter",
    value: gradient
  };
}

function lagSource({ url, zoom }, bbox) {
  return sysconfig.createTileSource(url, "Raster", zoom, bbox);
}

export default { drawAll, lagSource, lagStyle };
