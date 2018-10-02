function drawAll(drawArgs) {
  const layer = {
    data: { source: drawArgs.kode },
    [drawArgs.kode]: {
      data: { source: drawArgs.forelderkode },
      draw: {
        gradient: {
          order: 0,
        },
      },
    },
  }
  return layer
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

export default { drawAll, lagSource }
