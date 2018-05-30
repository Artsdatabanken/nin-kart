// Slår opp stilen fra style.json for lag med spesifikt navn
function hentLag(map, kode) {
  if (!kode) return null
  if (['FA', 'LI', 'AR'].indexOf(kode) >= 0) return null // temp: ignorer koder uten definerte lag

  // let prefix =
  //   kode.startsWith('BS') && !kode.startsWith('BS_6')
  //     ? 'NA'
  //     : kode.startsWith('BS_6')
  //       ? 'BS_' + kode.split('_')[1]
  //       : kode.split('_')[0]

  let prefix =
    kode.startsWith('BS') && !kode.startsWith('BS_6')
      ? 'NA'
      : kode.split('_')[0]

  let layer = map.getLayer(kode)
  if (layer) return layer

  // if (prefix.startsWith('BS_6')) {
  //   return {
  //     id: 'prefix',
  //     type: 'raster',
  //     source: 'prefix',
  //   }
  // }

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
