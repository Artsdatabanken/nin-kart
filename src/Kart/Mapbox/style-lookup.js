// Slår opp stilen fra style.json for lag med spesifikt navn
function hentLag(map, kode) {
  if (!kode) return null

  let layer = map.getLayer(kode)
  if (layer) return layer

  if (kode.endsWith('RASTER')) {
    return {
      id: kode,
      type: 'raster',
      source: kode,
    }
  }

  let prefix =
    kode.startsWith('RL') || (kode.startsWith('BS') && !kode.startsWith('BS_6'))
      ? 'NA'
      : kode.split('_')[0]

  let naLayer = {
    id: kode,
    type: 'fill',
    source: prefix,
    'source-layer': prefix,
    interactive: true,
    filter: ['has', kode.toUpperCase()],
    paint: {
      //'fill-opacity': 0.13,
      //      'fill-pattern': 'shovel',
      'fill-color': '#FFFF00',
      'fill-outline-color': '#FF0000',
    },
  }
  return naLayer
}
export default hentLag
