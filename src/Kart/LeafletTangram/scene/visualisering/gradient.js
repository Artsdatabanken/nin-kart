function drawAll(drawArgs, layer) {
  layer[drawArgs.kode] = {
    data: { source: drawArgs.forelderkode },
    draw: {
      gradient: {
        order: 0,
      },
    },
  }
  return layer
}

function lagSource(kode, bbox, zoom, config) {
  if (!bbox || !zoom) {
    console.warn(`No map data for ${kode}`)
  }
  const source = {
    type: 'Raster',
    url: `https://nintest.artsdatabanken.no/gradient/${kode}/{z}/{x}/{y}`,
    //    rasters: ['/gradient'],
  }

  if (bbox) {
    const [ll, ur] = bbox
    source.bounds = [ll[1], ll[0], ur[1], ur[0]]
  }
  if (zoom) {
    source.min_zoom = zoom[0]
    source.max_zoom = zoom[1]
  }
  config.sources[kode] = source
  /*  config.sources.gradient = {
    type: 'Raster',
    url: 'gradient.png',
  }*/
  console.log(config.sources)
}

function lagPekerTilSource(kode) {
  return { source: kode }
}

export default { drawAll, lagSource, lagPekerTilSource }
