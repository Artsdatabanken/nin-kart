import tinycolor from 'tinycolor2'

function draw(args) {
  let { kode, forelderkode, farge, opplystKode, visEtiketter } = args
  farge = opplystKode === kode ? '#f88' : farge
  const layer = {
    draw: {
      mu_polygons: {
        order: 100,
        color: farge,
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
  }
  if (bbox) {
    const [ll, ur] = bbox
    source.bounds = [ll[1], ll[0], ur[1], ur[0]]
  }
  if (zoom) {
    source.min_zoom = zoom[0]
    source.max_zoom = zoom[1]
  }
  console.log(source)
  config.sources[kode] = source
}

function lagPekerTilSource(kode) {
  return { source: kode, layer: kode }
}

export default { draw, lagSource, lagPekerTilSource }
