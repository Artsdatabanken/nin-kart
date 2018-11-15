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

function lagStyle() {
  const gradient = {
    base: 'raster',
    blend: 'multiply',
    shaders: {
      uniforms: {
        palette: 'https://maps.artsdatabanken.no/indexed/LA.palette.png',
      },
      blocks: {
        color_:
          'vec4 v = sampleRaster(0); color.rgb = v.rgb;color.g*=70. + 0.5./512.;//color = texture2D(gradient, vec2(v, 0.5));',
        color:
          //  'vec4 id = sampleRaster(0); float v=id.b * 0.5 + id.g *255.*0.5; color = sampleRasterAtPixel(0, vec2(v*255., 0));',
          'vec4 id = sampleRaster(0); float v=id.b * 0.5 + id.g *255.*0.5; color = texture2D(palette, vec2(v, 0.5));',
      },
    },
  }
  return { name: 'raster', value: gradient }
}

function lagSource(kode, bbox, zoom) {
  const source = sysconfig.createTileSource(
    `indexed/${kode}`,
    'Raster',
    zoom,
    bbox
  )
  return source
}

export default { drawAll, lagSource, lagStyle }
