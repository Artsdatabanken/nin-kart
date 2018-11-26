import sysconfig from '../../../../config'

function drawAll(drawArgs) {
  const layer = {
    data: { source: drawArgs.kode },
    [drawArgs.kode]: {
      data: { source: drawArgs.forelderkode },
      draw: {
        raster: {
          order: 700,
        },
      },
    },
  }
  return layer
}

function quantize(value) {
  return (
    Math.trunc(value[0] / 25 + 0.25) + '-' + Math.trunc(value[1] / 25 + 0.25)
  )
}

function lagStyle(viz, drawArgs) {
  const { kode, opplystKode } = drawArgs
  const barn = drawArgs.barn
  const ai = barn['LA-KLG-AI']
  let palettKode = opplystKode || kode
  if (ai) {
    const range = quantize(ai.value)
    if (range !== '0-4') palettKode += '-AI' + quantize(ai.value)
  }
  const gradient = {
    base: 'raster',
    blend: 'multiply',
    filtering: 'nearest',
    shaders: {
      uniforms: {
        palette: `https://maps.artsdatabanken.no/indexed/${palettKode}.palette.png`,
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
        vec4 fill = texture2D(palette, vec2(v/512., 0.5));
        float step = clamp((u_map_position.z-8.)*0.08,0.,1.);
        color = mix(fill, border,diff*step);
          `,
      },
    },
  }
  return { name: 'raster', value: gradient }
}

function lagSource(kode, bbox, zoom) {
  const prefix = kode.substring(0, 2)
  const source = sysconfig.createTileSource(
    `indexed/${prefix}`,
    'Raster',
    zoom,
    bbox
  )
  return source
}

export default { drawAll, lagSource, lagStyle }
