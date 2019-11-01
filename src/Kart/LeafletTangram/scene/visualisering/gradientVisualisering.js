import {
  lagGradientRampe,
  steps2Palette
} from "Funksjoner/palette/gradientrampe";
import drawSetup from "./fellesfunksjoner/drawSetup";
import lagSource from "./fellesfunksjoner/lagSource";

function drawAll(drawArgs) {
  return drawSetup(drawArgs, drawArgs.kode, "gradient_" + drawArgs.kode);
}

function normaliserFilter(format) {
  const { filterMin, filterMax } = format;
  const [omin, omax] = format.intervall.original;
  const [nmin, nmax] = format.intervall.normalisertVerdi;
  return [filterMin, filterMax].map(
    x => (((x - omin) / (omax - omin)) * (nmax - nmin) + nmin) / 255
  );
}

function lagStyle(format, drawArgs) {
  const { opplystKode, barn, palett, blendmode } = drawArgs;
  let [filterMin, filterMax] = normaliserFilter(format);
  const visning = drawArgs.format.aktivVisning;
  let transparent_blendmode_handler = `vec4 transparent = vec4(1.,1.,1.,0.);`;
  if (blendmode === "multiply") {
    transparent_blendmode_handler = `vec4 transparent = vec4(1.);`;
  }
  const palette = palett
    ? steps2Palette(palett)
    : lagGradientRampe(
        barn,
        opplystKode,
        visning || "diskret",
        blendmode,
        drawArgs.opacity
      );
  console.log("palette", palette);
  const gradient = {
    base: "raster",
    blend: blendmode,
    shaders: {
      uniforms: {
        palette: palette,
        min: filterMin || 0,
        max: filterMax || 1
      },
      blocks: {
        color:
          `
        vec4 value = sampleRaster(0);
        float v = value.r;
        float filter = step(min,v) * (step(v,max));
        v = (255.*value.b+0.5)/256.;
        color = texture2D(palette, vec2(v, 0.5));` +
          transparent_blendmode_handler +
          `color = mix(transparent, color, filter*value.a);
        `
      }
    }
  };
  return {
    name: "gradient_" + drawArgs.kode,
    value: gradient
  };
}

export default { drawAll, lagSource, lagStyle };
