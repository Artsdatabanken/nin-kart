// @flow
import bkmal from './mal/bakgrunnskart'

function bakgrunnskartlag(kode, erSynlig, style, farge, config) {
  if (!erSynlig) return
  let mal = bkmal[kode]

  if (mal.draw) mal.draw[style].color = farge
  //mal.source.osm = lagLayerSource(kode)
  config.layers[kode] = mal
  /*
  config.sources.openstreetmap = {
    type: 'MVT',
    url: `https://tiles.artsdatabanken.no/data/osm/{z}/{x}/{y}.pbf`,
    bounds: [-9.676172, 57.958206, 34.687848, 81.028018],
    //      bounds: [4.704237, 57.960319, 31.16815, 70.907624],
    max_zoom: 8,
  }*/
}

function lagBakgrunnskart(lag, config) {
  bakgrunnskartlag(
    'kommune',
    lag.kommunegrense,
    'boundary',
    lag.kommunegrensefarge,
    config
  )
  bakgrunnskartlag(
    'fylke',
    lag.fylkesgrense,
    'boundary',
    lag.fylkesgrensefarge,
    config
  )
  bakgrunnskartlag(
    'land',
    lag.landegrense,
    'boundary',
    lag.landegrensefarge,
    config
  )
  bakgrunnskartlag('vann', lag.vann, 'polygons', lag.vannfarge, config)
  bakgrunnskartlag('vannvei', lag.vann, 'lines', lag.vannfarge, config)

  bakgrunnskartlag(
    'transport',
    lag.transport,
    'mu_lines',
    lag.transportfarge,
    config
  )
  bakgrunnskartlag(
    'transport_navn',
    true || lag.transport_navn,
    'text',
    lag.transportfarge,
    config
  )
}

export { lagBakgrunnskart }
