import colorArray2Image from "Funksjoner/palette/colorArray2Image";
import landskapIndexTemp from "./fellesfunksjoner/landskap_index_temp";
import drawSetup from "./fellesfunksjoner/drawSetup";
import lagSource from "./fellesfunksjoner/lagSource";

function drawAll(drawArgs) {
  return drawSetup(drawArgs, drawArgs.forelderkode, drawArgs.kode);
}

const color = `
  float v = rgbaToIndex(sampleRaster(0));
  color = texture2D(palette, vec2(v, depth));
`;

const global = `
    highp float rgbaToIndex(vec4 rgba) {
    const float pixelWidth = 1./512.;
    // G = MSB, color 256-511, B = LSB, color 0-255
    return (rgba.g*256. + rgba.b)*255.*pixelWidth+0.5*pixelWidth;
  }`;

function lagStyle(format, drawArgs) {
  const { opplyst, blendmode } = drawArgs;
  const gradient = {
    base: "raster",
    blend: blendmode,
    animated: false,
    shaders: {
      uniforms: {
        palette: makePalette(opplyst, drawArgs),
        depth: 1 - (drawArgs.depth || 0) / 8 - 0.5 / 8
      },
      blocks: {
        global: global,
        color: color
      }
    }
  };
  return { name: drawArgs.kode, value: gradient };
}

function finnBarn(kode, barn, blank) {
  for (var barnet of barn) if (kode.startsWith(barnet.kode)) return barnet;
  return { kode: kode, farge: blank };
}

function makePalette(opplyst, drawArgs) {
  const barna = drawArgs.barn.length > 0 ? drawArgs.barn : [drawArgs];
  const hash = {};
  let blank = "#FFFFFF";
  if (drawArgs.blendmode === "translucent") {
    blank = "#fff0";
  }
  for (var b of barna) hash[b.kode] = b.farge;
  const colors = [];
  Object.keys(landskapIndexTemp).forEach(kode => {
    const barnet = finnBarn(kode, barna, blank);
    if (barnet.erSynlig === false) {
      colors.push(blank);
    } else if (barnet.kode === opplyst.kode) {
      colors.push("#f88");
    } else {
      colors.push(barnet.farge);
    }
  });
  return colorArray2Image(colors, drawArgs.blendmode, drawArgs.opacity);
}

export default { drawAll, lagSource, lagStyle };
