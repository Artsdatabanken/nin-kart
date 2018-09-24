import { isNull } from 'util'

var sources = {}

async function lagSource(kode, config) {
  if (!sources.hasOwnProperty(kode) || isNull(sources[kode])) {
    var fetcher = await fetch(`https://nintest.artsdatabanken.no/`)
    if (fetcher.status === 200) {
      var data = await fetcher.json()
      setSources(data.tilesets)
      setConfig(config, kode)
    }
  } else setConfig(config, kode)
  return
}

function setConfig(config, kode) {
  if (sources && config) config.sources[kode] = sources[kode]
}

function setSources(tilesets) {
  if (!isNull(tilesets)) {
    var keys = Object.keys(tilesets)
    for (var key in keys) {
      var kode = keys[key]
      sources[kode] = {
        type: 'MVT',
        url: tilesets[kode].url,
        bounds: tilesets[kode].bounds,
        max_zoom: tilesets[kode].zoom[1],
        min_zoom: tilesets[kode].zoom[0],
      }
    }
  }
}

function lagLayerSource(kode) {
  return { source: kode, layer: kode }
}

export { lagSource, lagLayerSource }
