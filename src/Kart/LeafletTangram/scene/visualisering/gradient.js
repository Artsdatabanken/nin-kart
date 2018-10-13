import sysconfig from '../../../../config'

function drawAll(drawArgs) {
  const layer = {
    data: { source: drawArgs.kode },
    [drawArgs.kode]: {
      data: { source: drawArgs.forelderkode },
      draw: {
        gradient: {
          order: 700,
        },
      },
    },
  }
  return layer
}

function lagStyle({ filterMin, filterMax }) {
  const gradient = {
    base: 'raster',
    blend: 'multiply',
    shaders: {
      uniforms: {
        gradient: '/BS_6SE.png',
        //gradient: createColorTexture(document.createElement('canvas')),
        min: filterMin,
        max: filterMax,
      },
      blocks: {
        color:
          'float v = sampleRaster(0).r; float x = step(min,v);float y=(1.-step(max,v));color = texture2D(gradient, vec2(x*y*v, 0.5));',
      },
    },
  }
  return { name: 'gradient', value: gradient }
}

function lagSource(kode, bbox, zoom) {
  const source = sysconfig.createTileSource(
    `gradient/${kode}`,
    'Raster',
    zoom,
    bbox
  )

  return source
}

export default { drawAll, lagSource, lagStyle }
