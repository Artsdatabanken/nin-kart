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

function lagStyle(viz, drawArgs) {
  const { filterMin, filterMax, opplystKode, barn } = drawArgs;
  const steps = Object.keys(barn)
    .map(key => {
      const b = barn[key];
      const rgba = new tinycolor(b.gradientColor).toRgb();
      const level = rgba.r;
      return { level: level, color: b.farge };
    })
    .sort((a, b) => a.level < b.level);
  const cmap = [];
  for (let i = 0; i < steps.length - 1; i++) {
    const a = steps[i];
    const b = steps[i + 1];
    for (let ci = a.level; ci <= b.level; ci++) {
      const weight = (100 * (ci - a.level)) / (b.level - a.level);
      const tc = tinycolor.mix(a.color, b.color, weight);
      cmap[ci] = tc.toHexString();
    }
  }
  if (opplystKode) {
    const rgba = new tinycolor(barn[opplystKode].gradientColor).toRgb();
    const opplystLevel = rgba.r;
    for (let i = 0; i <= 255; i++) {
      const dist = Math.abs(opplystLevel - i);
      const farge = tinycolor(cmap[i]);
      cmap[i] = farge.desaturate(Math.min(80, 2 * dist)).toHexString();
    }
  }

  cmap[255] = "#ff0000";
  cmap[254] = "#00ff00";
  cmap[253] = "#0000ff";
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
  //        color = vec4(v,0,0,1.0);
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

function lagSource(kode, bbox, zoom) {
  //  kode = "RL-DD"
  const source = sysconfig.createTileSource(
    `${kode.replace(/-/g, "/")}/raster.gradient.3857`,
    "Raster",
    zoom,
    bbox
  );

  return source;
}

export default { drawAll, lagSource, lagStyle };
