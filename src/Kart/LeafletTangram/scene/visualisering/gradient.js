import sysconfig from "../../../../config";
import createPalette from "./palette";
import tinycolor from "tinycolor2";

function drawAll(drawArgs) {
  const layer = {
    [drawArgs.kode]: {
      data: { source: drawArgs.kode },
      draw: {
        gradient: {
          order: 700
        }
      }
    }
  };
  return layer;
}

function lagPalett(barna, opplystKode, mode) {
  let opplystLevel = -1;
  let steps = [];
  barna.forEach(b => {
    const key = b.kode;
    let levels = b.normalisertVerdi;
    if (levels === undefined) return;
    if (!Array.isArray(levels)) levels = [levels];
    if (key === opplystKode) opplystLevel = levels;
    levels.forEach(level => steps.push({ level: level, color: b.farge }));
  });

  steps = steps.sort((a, b) => a.level - b.level);
  if (mode === "kontinuerlig") {
    for (let i = steps.length - 3; i > 0; i -= 2) {
      steps[i].level = 0.5 * (steps[i].level + steps[i + 1].level);
      steps.splice(i + 1, 1);
    }
  }
  const cmap = [];
  for (let i = 0; i < steps.length - 1; i++) {
    const a = steps[i];
    const b = steps[i + 1];
    for (let ci = Math.trunc(a.level); ci <= Math.trunc(b.level); ci++) {
      let weight = (100 * (ci - a.level)) / (b.level - a.level);
      weight = Math.max(0, Math.min(100, weight));
      let tc = tinycolor.mix(a.color, b.color, weight);
      if (opplystLevel !== -1) {
        if (opplystLevel.length < 2)
          opplystLevel = [opplystLevel[0] - 5, opplystLevel[0] + 5];

        if (ci < opplystLevel[0] || ci > opplystLevel[1])
          tc = tc.lighten(10).desaturate(100);
        //        else tc = tc.darken(30); //.saturate(40);
      }
      cmap[ci] = tc.toHexString();
    }
  }
  return cmap;
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
  const [visning] = drawArgs.format.visning;
  const cmap = lagPalett(barn, opplystKode, visning || "diskret");
  const palette = createPalette(cmap);
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
        color = texture2D(palette, vec2(filter*v, 0.5));
        vec4 transparent = vec4(1.,1.,1.,1.);
        color = mix(transparent, color, value.a);`
      }
    }
  };
  return {
    name: "gradient",
    value: gradient
  };
}

function lagSource({ url, zoom }, bbox) {
  return sysconfig.createTileSource(url, "Raster", zoom, bbox);
}

export default { drawAll, lagSource, lagStyle };
