function lagSource(kode, bbox, zoom, config) {
  if (!bbox || !zoom) {
    console.warn(`No map data for ${kode}`)
  }
  const source = {
    type: 'MVT',
    url: `https://{s}.artsdatabanken.no/polygon/${kode}/{z}/{x}/{y}`,
    url_subdomains: ['nintest', 'rover'],
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
}

function lagPekerTilSource(kode) {
  return { source: kode, layer: kode }
}

export { lagSource, lagPekerTilSource }
