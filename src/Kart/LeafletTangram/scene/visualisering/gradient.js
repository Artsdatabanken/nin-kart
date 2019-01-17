import sysconfig from "../../../../config";
import createPalette from "./palette";
import tinycolor from "tinycolor2";

function drawAll(drawArgs) {
  const layer = {
    data: { source: drawArgs.kode },
    [drawArgs.kode]: {
      data: { source: drawArgs.forelderkode },
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
    for (let ci = a.level; ci <= b.level; ci++) {
      const weight = (100 * (ci - a.level)) / (b.level - a.level);
      let tc = tinycolor.mix(a.color, b.color, weight);
      if (opplystLevel !== -1) {
        if (opplystLevel.length < 2)
          opplystLevel = [opplystLevel[0] - 5, opplystLevel[0] + 5];
        if (ci < opplystLevel[0] || ci > opplystLevel[1])
          tc = tc.lighten(10).desaturate(40);
        else tc = tc.darken(30); //.saturate(40);
      }
      cmap[ci] = tc.toHexString();
    }
  }
  return cmap;
}

function lagStyle(kartformat, drawArgs) {
  const { filterMin, filterMax, opplystKode, barn } = drawArgs;
  const cmap = lagPalett(barn, opplystKode, 1 > 0 ? "diskret" : "kontinuerlig");
  const palette = createPalette(cmap);
  const gradient = {
    base: "raster",
    blend: "multiply",
    shaders: {
      uniforms: {
        palette: palette,
        min: filterMin || 0,
        max: filterMax || 1
      },
      blocks: {
        color: `
          vec4 value = sampleRaster(0);
          float v = sampleRaster(0).r;
          float x = step(min,v);
          float y=(1.-step(max,v));
          color = texture2D(palette, vec2(x*y*v-0.002, 0.5));
          vec4 transparent = vec4(1.,1.,1.,1.);
//          color = vec4(v,0,0,1.0);
          color = mix(transparent, color, value.a);
//          color = texture2D(palette, vec2(255./256.+.5 / 256., 0.));
//          vec2 pos = gl_FragCoord.xy;
//          color = texture2D(palette, vec2(pos.x*0.0005,0.5));
`
      }
    }
  };
  return { name: "gradient", value: gradient };
}

function lagSource(url, bbox, zoom) {
  const source = sysconfig.createTileSource(url, "Raster", zoom, bbox);

  return source;
}

export default { drawAll, lagSource, lagStyle };
