import tinycolor from 'tinycolor2'

function drawAll({
  kode,
  barn,
  farge,
  opplystKode,
  bbox,
  zoom,
  sourceType,
  fileFormat,
  visBarn,
  visEtiketter,
}) {
  const layer = {
    data: { source: kode, layer: kode },
  }
  if (visBarn) {
    Object.keys(barn).forEach(barnkode => {
      const visEtiketter = barnkode === opplystKode
      layer[barnkode] = draw({
        kode: barnkode,
        forelderkode: kode,
        farge: barn[barnkode].farge,
        opplystKode: opplystKode,
        visEtiketter: visEtiketter,
      })
    })
  } else
    layer[kode] = draw({
      kode: kode,
      forelderkode: kode,
      farge: barn[kode].farge,
      opplystKode: opplystKode,
      visEtiketter: visEtiketter,
    })
  return layer
}

function draw(args) {
  let { kode, farge, opplystKode, visEtiketter } = args
  farge = opplystKode === kode ? '#f88' : farge
  const layer = {
    draw: {
      mu_polygons: {
        order: 800,
        color: farge,
      },
      lines: {
        order: 800,
        color: tinycolor(farge)
          .darken(30)
          .toHexString(),
        width: '1.0px',
      },
    },
  }
  layer.filter = { code: kode }
  if (kode === opplystKode) {
    const lines = layer.draw.lines
    lines.width = '2px'
  }
  if (visEtiketter) {
    layer.draw.text = {
      text_source: ['name', 'title'],
      font: {
        family: 'Roboto',
        fill: 'hsla(0, 0%, 100%, 1.0)',
        stroke: { color: 'hsla(0, 0%, 0%, 0.7)', width: 2 },
        size: '13px',
      },
    }
  }
  return layer
}

function lagSource(kode, bbox, zoom) {
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
  return source
}

export default { drawAll, lagSource }
