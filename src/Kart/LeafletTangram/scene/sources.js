import { isNull } from 'util'

const sources = {}

async function lagSource(kode, config) {
  if (!sources.hasOwnProperty(kode) || isNull(sources[kode])) {
    var fetcher = await fetch(
      `https://tiles.artsdatabanken.no/data/${kode}.json`
    )
    if (fetcher.status === 200) {
      var data = await fetcher.json()
      setSource(data, kode)
      setConfig(config, kode)
    }
  } else setConfig(config, kode)
  return
}

function setConfig(config, kode) {
  if (sources && config) config.sources[kode] = sources[kode]
}

function setSource(data, kode) {
  if (!isNull(data)) {
    sources[kode] = {
      type: 'MVT',
      url: data.tiles[0].replace('http', 'https'),
      bounds: data.bounds,
      max_zoom: data.maxzoom,
      min_zoom: data.minzoom,
    }
  }
}

function lagLayerSource(kode) {
  return { source: kode, layer: kode }
}

export { lagSource, lagLayerSource }
