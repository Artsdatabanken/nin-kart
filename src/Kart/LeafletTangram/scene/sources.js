function lagSource(kode, bbox, zoom, config) {
  if (!bbox || !zoom) {
    console.warn(`No map data for ${kode}`)
    return
  }
  const [ll, ur] = bbox
  config.sources[kode] = {
    type: 'MVT',
    url: `https://nintest.artsdatabanken.no/${kode}/{z}/{x}/{y}`,
    bounds: [ll[1], ll[0], ur[1], ur[0]],
    min_zoom: zoom[0],
    max_zoom: zoom[1],
  }
}

function lagPekerTilSource(kode) {
  return { source: kode, layer: kode }
}

export { lagSource, lagPekerTilSource }
