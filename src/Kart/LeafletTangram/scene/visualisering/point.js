function drawAll({
  kode,
  barn,
  opplystKode,
  bbox,
  zoom,
  sourceType,
  fileFormat,
}) {
  const layer = {
    data: { source: kode },
  }
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
  return layer
}

function draw(args) {
  let { kode, forelderkode, opplystKode, visEtiketter } = args
  const size = opplystKode === kode ? '75%' : '50%'
  const layer = {
    data: { source: 'OR' },
    draw: {
      po: {
        size: size,
        collide: false,
        texture: `https://firebasestorage.googleapis.com/v0/b/grunnkart.appspot.com/o/bilde%2Favatar%2F40%2F${kode}.png?alt=media`,
      },
    },
  }
  if (kode !== forelderkode) layer.filter = { kode: kode }
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
  const source = {
    type: 'GeoJSON',
    url: `https://{s}.artsdatabanken.no/point/${kode}.geojson`,
    url_subdomains: ['nintest', 'rover'],
  }
  return source
}

export default { drawAll, lagSource }
