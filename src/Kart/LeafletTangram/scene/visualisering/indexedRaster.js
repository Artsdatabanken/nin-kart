import sysconfig from "Funksjoner/config";

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

/*
function quantize(value) {
  return (
    Math.trunc(value[0] / 25 + 0.25) + '-' + Math.trunc(value[1] / 25 + 0.25)
  )
}*/

function lagStyle(format, drawArgs) {
  const { opplyst, url } = drawArgs;
  let palettUrl = opplyst.url || url;
  const newPalette = `${
    sysconfig.storageUrl
  }${palettUrl}/raster_indexed_palette.png`;

  const gradient = {
    base: "raster",
    blend: "multiply",
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
/*
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
        vec4 fill1 = texture2D(palette1, vec2(v/512., depth));
        vec4 fill2 = texture2D(palette2, vec2(v/512., depth));
        vec4 fill = mix(fill1, fill2, clamp(u_time*2.5,0.,1.));
        float step = clamp((u_map_position.z-8.)*0.08,0.,1.);
        color = mix(fill, border,diff*step);
        //color = sampleRaster(0);
      //  color= vec4(1.,1.,0.,1.);
      `
*/
function lagSource({ url, zoom }, { bbox }) {
  const source = sysconfig.createTileSource(url, "Raster", zoom, bbox);
  //  source.tile_size = 256;
  return source;
}

export default { drawAll, lagSource, lagStyle };
