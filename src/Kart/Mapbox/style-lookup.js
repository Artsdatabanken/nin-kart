// Slår opp stilen fra style.json for lag med spesifikt navn
function hentLag(map, kode) {
  if (!kode) return null
  if (['FA', 'LI', 'AR'].indexOf(kode) >= 0) return null // temp: ignorer koder uten definerte lag

  let prefix = kode.split('_')[0]

  if (prefix === 'BS') prefix = 'NA' // BS-koder ligger som tagger på NA-laget

  let layer = map.getLayer(kode)
  if (layer) return layer

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
