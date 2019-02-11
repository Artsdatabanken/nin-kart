import sysconfig from "../../../../config";

function drawAll(drawArgs) {
  const layer = {
    [drawArgs.kode]: {
      data: { source: drawArgs.forelderkode },
      draw: {
        raster: {
          order: 700
        }
      }
    }
  };
  return layer;
}

/*
function quantize(value) {
  return (
    Math.trunc(value[0] / 25 + 0.25) + '-' + Math.trunc(value[1] / 25 + 0.25)
  )
}*/

function lagStyle(kartformat, drawArgs) {
  const { kode, opplystKode } = drawArgs;
  //const barn = drawArgs.barn
  let palettKode = kode;
  if (opplystKode.startsWith(kode)) {
    palettKode = opplystKode;
    //const ai = barn['LA-KLG-AI']
    /*    if (ai) {
      const range = quantize(ai.value)
      if (range !== '0-4') palettKode += '-AI' + quantize(ai.value)
    }
*/
  }
  const newPalette = `${sysconfig.storageUrl}${
    drawArgs.url
  }/${palettKode}.palette.png`;

  if (this.palette1 !== this.palette2 || !this.palette1)
    this.palette1 = this.palette2 || newPalette;
  this.palette2 = newPalette;
  const gradient = {
    base: "raster",
    blend: "multiply",
    animated: true,
    shaders: {
      uniforms: {
        palette1: this.palette1,
        palette2: this.palette2
      },
      blocks: {
        global: `
          float unpack(vec4 h) {
            return (65535. * h.g + 255. * h.b + 0.5) / 512.;
          }
          float rgbaToIndex(vec4 rgba) {
            return rgba.g * 65535. + rgba.b * 255.;
          }`,
        color: `
        float px = 1.;
        vec3 off = vec3(-px, 0, px);
        float v = rgbaToIndex(sampleRaster(0));
        float diff = abs(v - rgbaToIndex(sampleRasterAtPixel(0, vec2(currentRasterPixel(0) + off.xy))));
        diff += abs(v-rgbaToIndex(sampleRasterAtPixel(0, vec2(currentRasterPixel(0) + off.zy))));
        diff += abs(v-rgbaToIndex(sampleRasterAtPixel(0, vec2(currentRasterPixel(0) + off.yx))));
        diff += abs(v-rgbaToIndex(sampleRasterAtPixel(0, vec2(currentRasterPixel(0) + off.yz))));
        diff = clamp(diff,0.,1.);
        vec4 border = vec4(0.,0.,0.,0.8);
        vec4 fill1 = texture2D(palette1, vec2(v/512., 0.5));
        vec4 fill2 = texture2D(palette2, vec2(v/512., 0.5));
        vec4 fill = mix(fill1, fill2, clamp(u_time*2.5,0.,1.));
        float step = clamp((u_map_position.z-8.)*0.08,0.,1.);
        color = mix(fill, border,diff*step);
          `
      }
    }
  };
  return { name: "raster", value: gradient };
}

function lagSource({ url, zoom }, bbox) {
  const source = sysconfig.createTileSource(url, "Raster", zoom, bbox);
  //  source.tile_size = 256;
  return source;
}

export default { drawAll, lagSource, lagStyle };
