function lagSource(kode, bbox, zoom, config) {
  if (!bbox) {
    console.warn(`No map data for ${kode}`)
    return
  }
  if (!zoom) zoom = [0, 18]
  config.sources[kode] = {
    type: 'MVT',
    url: `https://nintest.artsdatabanken.no/${kode}/{z}/{x}/{y}`,
    bounds: [bbox[0][1], bbox[0][0], bbox[1][1], bbox[1][0]],
    min_zoom: zoom[0],
    max_zoom: zoom[1],
  }
}

function lagLayerSource(kode) {
  return { source: kode, layer: kode }
}

export { lagSource, lagLayerSource }
