import sysconfig from "../../../../config";
import tinycolor from "tinycolor2";

function drawAll(drawArgs) {
  const layer = {
    [drawArgs.kode]: {
      data: { source: drawArgs.kode },
      draw: {
        ["ruter_" + drawArgs.kode]: {
          order: 700
        }
      }
    }
  };
  return layer;
}

function lagStyle(format, drawArgs) {
  let farge = tinycolor(
    drawArgs.opplystBarn ? drawArgs.opplystBarn.farge : drawArgs.farge
  );
  if (drawArgs.opplystKode && !drawArgs.opplystBarn) farge.lighten(20);
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
    name: "ruter_" + drawArgs.kode,
    value: gradient
  };
}

function lagSource({ url, zoom }, drawArgs) {
  if (drawArgs.opplystBarn)
    url = url.replace(drawArgs.url, drawArgs.opplystBarn.url);
  return sysconfig.createTileSource(url, "Raster", zoom, drawArgs.bbox);
}

export default { drawAll, lagSource, lagStyle };
