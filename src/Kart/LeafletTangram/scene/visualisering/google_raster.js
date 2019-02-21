import tinycolor from "tinycolor2";

function drawAll({ kartformat, opplystKode }) {
  return {
    google: {
      draw: {
        googleshade: {
          //        raster: {
          //        color: farge(opplystKode, kartformat.tint),
          order: 0
        }
      },
      data: { source: "bakgrunnskart" }
    }
  };
}

function farge(opplystKode, tint) {
  if (!opplystKode) return tint;
  if (opplystKode === "bakgrunnskart") return null;
  return "hsla(0,0%,100%,0.75)";
}

function lagSource({ url, zoom }, bbox) {
  return {
    type: "Raster",
    url: url,
    max_zoom: zoom[1]
  };
}

function lagStyle(kartformat, drawArgs) {
  const tint = tinycolor(drawArgs.kartformat.tint);
  const tintar = [tint._r / 255, tint._g / 255, tint._b / 255, 1.0 - tint._a];

  return {
    name: "googleshade",
    value: {
      base: "raster",
      shaders: {
        uniforms: { tint: tintar },
        blocks: {
          color: `
            color.rgb = sampleRaster(0).rgb;
            color.rgb *= tint.rgb;
            color.rgb = mix(color.rgb,vec3(1.),tint.a);
    `
        }
      }
    }
  };
}

export default { drawAll, lagSource, lagStyle };
