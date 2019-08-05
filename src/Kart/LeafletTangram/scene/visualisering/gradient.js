import sysconfig from "Funksjoner/config";
import lagGradientrampe from "Funksjoner/palette/gradientrampe";

function drawAll(drawArgs) {
  const layer = {
    [drawArgs.kode]: {
      data: { source: drawArgs.kode },
      draw: {
        ["gradient_" + drawArgs.kode]: {
          order: 700
        }
      }
    }
  };
  return layer;
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
  const { opplystKode, barn } = drawArgs;
  let [filterMin, filterMax] = normaliserFilter(format);
  const visning = drawArgs.format.aktivVisning;
  const palette = lagGradientrampe(barn, opplystKode, visning || "diskret");
  const gradient = {
    base: "raster",
    blend: "multiply",
    xblend: "overlay",
    fblend: "add",
    shaders: {
      uniforms: {
        palette: palette,
        min: filterMin || 0,
        max: filterMax || 1
      },
      blocks: {
        color: `
        vec4 value = sampleRaster(0);
        float v = value.r;
        float filter = step(min,v) * (step(v,max));
        v = (255.*value.b+0.5)/256.;
        color = texture2D(palette, vec2(v, 0.5));
        vec4 transparent = vec4(1.);
        color = mix(transparent, color, filter*value.a);`
      }
    }
  };
  return {
    name: "gradient_" + drawArgs.kode,
    value: gradient
  };
}

function lagSource({ url, zoom }, { bbox }) {
  return sysconfig.createTileSource(url, "Raster", zoom, bbox);
}

export default { drawAll, lagSource, lagStyle };
