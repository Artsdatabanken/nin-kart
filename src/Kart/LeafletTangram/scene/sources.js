function lagSource(kode, r) {
  r[kode] = {
    type: 'MVT',
    url: `https://tiles.artsdatabanken.no/data/${kode}/{z}/{x}/{y}.pbf`,
    bounds: [-9.676172, 57.958206, 34.687848, 81.028018],
    //      bounds: [4.704237, 57.960319, 31.16815, 70.907624],
    max_zoom: 8,
  }
}

function lagSources(aktiveLag, katalogKode) {
  const r = {}
  if (katalogKode) lagSource(katalogKode, r)
  Object.keys(aktiveLag).forEach(kode => {
    const lag = aktiveLag[kode]
    if (lag.type === 'polygon') lagSource(kode, r)
  })
  return r
}

function lagLayerSource(kode) {
  return { source: kode, layer: kode }
}

export { lagSources, lagLayerSource }
