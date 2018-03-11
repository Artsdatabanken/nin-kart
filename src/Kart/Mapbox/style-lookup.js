// Slår opp stilen fra style.json for lag med spesifikt navn
function hentLag(map, kode) {
  if (!kode) return null

  let layer = map.getLayer(kode)
  if (layer) return layer

  const fylkeNr = 1 //getFylke(kode)

  if (fylkeNr) {
    const filter =
      fylkeNr === 'ALL' ? ['!=', 'AO', '-1'] : ['in', 'AO', '', fylkeNr]
    return {
      id: kode,
      type: 'fill',
      custom: true,
      source: 'composite',
      'source-layer': 'FY',
      filter: filter,
      layout: {},
      paint: {
        'fill-outline-color': {
          base: 1,
          stops: [
            [0, 'hsla(0, 0%, 0%, 70%)'],
            [7, 'hsla(0, 0%, 0%, 70%)'],
            [10, 'hsla(0, 0%, 0%, 0%)'],
          ],
        },
        'fill-color': {
          base: 1,
          stops: [
            [0, 'hsla(0, 0%, 100%, 20%)'],
            [7, 'hsla(0, 0%, 100%, 20%)'],
            [10, 'hsla(0, 0%, 0%, 0%)'],
          ],
        },
      },
    }
  }

  let kommuneMatch = kode.match(/AO_([0-9][0-9])-(.*)/)
  if (kommuneMatch && kommuneMatch.length === 3) {
    let kommuneNr = '' + (kommuneMatch[1] + kommuneMatch[2])
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
