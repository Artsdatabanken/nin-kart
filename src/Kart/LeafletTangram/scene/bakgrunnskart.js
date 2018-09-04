// @flow
import bkmal from './mal/bakgrunnskart'

function bakgrunnskartlag(kode, erSynlig, style, farge, lag) {
  if (!erSynlig) return
  let mal = bkmal[kode]
  mal.draw[style].color = farge
  lag[kode] = mal
}

function lagBakgrunnskart(lag, r) {
  console.log(lag)
  const grenser = {
    data: {
      source: 'osm',
      layer: 'boundary',
    },
  }
  bakgrunnskartlag(
    'kommune',
    lag.kommunegrense,
    'boundary',
    lag.kommunegrensefarge,
    grenser
  )
  bakgrunnskartlag(
    'fylke',
    lag.fylkesgrense,
    'boundary',
    lag.fylkesgrensefarge,
    grenser
  )
  bakgrunnskartlag(
    'land',
    lag.landegrense,
    'boundary',
    lag.landegrensefarge,
    grenser
  )
  r[lag.kode] = grenser
  bakgrunnskartlag('vann', lag.vann, 'polygons', lag.vannfarge, r)
  bakgrunnskartlag('vannvei', lag.vann, 'lines', lag.vannfarge, r)
  bakgrunnskartlag(
    'transport',
    lag.transport,
    'mu_lines',
    lag.transportfarge,
    r
  )
  console.log(r)
}

export { lagBakgrunnskart }
