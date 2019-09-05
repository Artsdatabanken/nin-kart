import sysconfig from "Funksjoner/config";
import colorArray2Image from "Funksjoner/palette/colorArray2Image";
import landskapIndexTemp from "./landskap_index_temp";

function drawAll(drawArgs) {
  const layer = {
    [drawArgs.kode]: {
      data: { source: drawArgs.forelderkode },
      draw: {
        [drawArgs.kode]: {
          order: 700
        }
      }
    }
  };
  return layer;
}

function lagStyle(format, drawArgs) {
  const { opplyst } = drawArgs;
  let newPalette = makePalette(opplyst, drawArgs);
  const gradient = {
    base: "raster",
    blend: "normal",
    animated: false,
    shaders: {
      uniforms: {
        palette: newPalette,
        depth: 1 - (drawArgs.depth || 0) / 8 - 0.5 / 8
      },
      blocks: {
        global: `
        highp float rgbaToIndex(vec4 rgba) {
            const float pixelWidth = 1./512.;
            // G = MSB, color 256-511, B = LSB, color 0-255
            return (rgba.g*256. + rgba.b)*255.*pixelWidth+0.5*pixelWidth;
          }`,
        color: `
          float v = rgbaToIndex(sampleRaster(0));
          color = texture2D(palette, vec2(v, depth));
      `
      }
    }
  };
  return { name: drawArgs.kode, value: gradient };
}

function finnBarn(kode, barn) {
  for (var barnet of barn) if (kode.startsWith(barnet.kode)) return barnet;
  return { kode: kode, farge: "#fff" };
}

function makePalette(opplyst, drawArgs) {
  const barna = drawArgs.barn.length > 0 ? drawArgs.barn : [drawArgs];
  const hash = {};
  for (var b of barna) hash[b.kode] = b.farge;
  const colors = [];
  Object.keys(landskapIndexTemp).forEach(kode => {
    const barnet = finnBarn(kode, barna);

    if (barnet.erSynlig === false) {
      colors.push("#fff0");
    } else if (barnet.kode === opplyst.kode) {
      colors.push("#f88");
    } else {
      colors.push(barnet.farge);
    }
  });
  return colorArray2Image(colors);
}

function lagSource({ url, zoom }, { bbox }) {
  return sysconfig.createTileSource(url, "Raster", zoom, bbox);
}

export default { drawAll, lagSource, lagStyle };
