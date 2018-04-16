function getFylke(kode) {
  if (!kode.startsWith('AO_')) return null
  let fylkesMatch = kode.match(/AO_([0-9][0-9])(-.*)*/)
  if (fylkesMatch && fylkesMatch.length === 3 && !fylkesMatch[2]) {
    return fylkesMatch[1]
  }
  return null
}

// Slår opp stilen fra style.json for lag med spesifikt navn
function hentLag(map, kode) {
  if (!kode) return null
  if (['FA', 'LI', 'AR'].indexOf(kode) >= 0) return null // temp: ignorer koder uten definerte lag

  let layer = map.getLayer(kode)
  if (layer) return layer

  const fylkeNr = getFylke(kode)

  if (fylkeNr) {
    const filter =
      fylkeNr === 'ALL' ? ['!=', 'FY', '-1'] : ['in', 'FY', '', fylkeNr]
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
      custom: true,
      type: 'fill',
      source: 'composite',
      'source-layer': 'KO',
      filter: ['in', 'KO', '', kommuneNr],
      layout: {},
      paint: {
        'fill-outline-color': {
          base: 1,
          stops: [
            [0, 'hsla(0, 0%, 0%, 60%)'],
            [9, 'hsla(0, 0%, 0%, 20%)'],
            [11, 'hsla(0, 0%, 0%, 0%)'],
          ],
        },
        'fill-color': {
          base: 1,
          stops: [
            [0, 'hsla(0, 0%, 100%, 60%)'],
            [9, 'hsla(0, 0%, 100%, 20%)'],
            [12, 'hsla(0, 0%, 0%, 0%)'],
          ],
        },
      },
    }
  }

  let naLayer = {
    id: kode,
    type: 'fill',
    source: 'sqrt42',
    'source-layer': 'sqrt42',
    interactive: true,
    filter: ['has', kode.toUpperCase()],
    paint: {
      //'fill-opacity': 0.13,
      //      'fill-pattern': 'shovel',
      'fill-color': '#FFFF00',
      'fill-outline-color': '#FF0000',
    },
  }

  if (kode.length === 2) {
    // spesialtilfelle for toppnivå
    delete naLayer.filter
    naLayer.paint = {
      'fill-color': 'hsla(251, 59%, 28%, 0.8)',
      'fill-outline-color': 'hsla(128, 88%, 29%, 0.8)',
    }
  }
  return naLayer
}
export default hentLag
