import sysconfig from "Funksjoner/config";
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
  ).saturate(30);
  if (drawArgs.opplystKode && !drawArgs.opplystBarn) farge.lighten(20);
  const fargear = [farge._r / 255, farge._g / 255, farge._b / 255, farge._a];
  const gradient = {
    base: "raster",
    blend: "multiply",
    shaders: {
      uniforms: { farge: fargear, palette: "/magma.png" },
      blocks: {
        color: `
        float value = 1.-sampleRaster(0).r;
        float zoomratio = smoothstep(8.,10.,(u_map_position.z)); 
        value = mix(
          value,
          1.8-step(value,0.98),
          zoomratio);
        vec4 transparent = vec4(1.);
        vec4 g = texture2D(palette, vec2(value, 0.5));
        color = mix(transparent, g, farge.a);
        `
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
