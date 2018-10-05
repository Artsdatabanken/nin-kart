// @flow
import bkmal from './mal/bakgrunnskart'

function opprett(kode, lag, config, style) {
  if (!lag[kode]) return
  let mal = bkmal[kode]
  if (mal.draw) mal.draw[style].color = lag[kode + '_farge']
  config.layers[kode] = mal
}

function opprettTekst(kode, lag, config, style) {
  if (!lag[kode]) return
  let mal = bkmal[kode]

  mal.draw.text.font.fill = lag[kode + '_farge']
  config.layers[kode] = mal
}

function lagBakgrunnskart(lag, config) {
  if (!lag.erSynlig) return
  opprett('kommunegrense', lag, config, 'boundary')
  opprett('fylkesgrense', lag, config, 'boundary')
  opprett('landegrense', lag, config, 'boundary')
  opprett('vann', lag, config, 'polygons')
  opprett('vannvei', lag, config, 'lines')
  opprett('transport', lag, config, 'mu_lines')
  opprettTekst('transport_navn', lag, config)
  opprettTekst('sted_navn', lag, config)
  opprettTekst('vann_navn', lag, config)
}

export { lagBakgrunnskart }
