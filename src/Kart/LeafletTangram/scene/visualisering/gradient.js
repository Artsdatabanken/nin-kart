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
  console.log('gradient', filterMin, filterMax)
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
  if (!bbox || !zoom) {
    console.warn(`No map data for ${kode}`)
  }
  const source = {
    type: 'Raster',
    url: `https://nintest.artsdatabanken.no/gradient/${kode}/{z}/{x}/{y}`,
  }

  if (bbox) {
    const [ll, ur] = bbox
    source.bounds = [ll[1], ll[0], ur[1], ur[0]]
  }
  if (zoom) {
    source.min_zoom = zoom[0]
    source.max_zoom = zoom[1]
  }
  return source
}

export default { drawAll, lagSource, lagStyle }
