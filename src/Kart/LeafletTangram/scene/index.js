// @flow
import { lagBakgrunnskart } from './bakgrunnskart'
import imports from './import'
import { createLights } from './lights'
import { createSources, lagSource } from './sources'
import { createStyles } from './styles'

function lagAktiveLag(aktive, iKatalog, opplystKode) {
  let layers = {}
  aktive.forEach(lag => lagEttLag(lag, opplystKode, iKatalog, layers))
  return layers
}

function lagEttLag(lag, opplystKode, iKatalog, r) {
  if (!lag.erSynlig) return
  switch (lag.kode) {
    case 'bakgrunnskart':
      lagBakgrunnskart(lag, r)
      break
    default:
      if (!iKatalog) lagPolygonlag(lag, opplystKode, r)
  }
}

function lagKatalogLag(forelderkode, barn, opplystKode) {
  let layer = {
    data: lagSource(forelderkode),
  }
  Object.keys(barn).forEach(kode => {
    layer[kode] = lagDrawblokk(kode, barn[kode].farge, opplystKode)
  })
  return { [forelderkode]: layer }
}

function lagDrawblokk(kode, farge, opplystKode) {
  farge = opplystKode === kode ? '#f00' : farge
  const layer = {
    filter: { [kode]: true },
    draw: {
      mu_polygons: {
        order: 100,
        color: farge,
      },
      mu_lines: {
        order: 100,
        color: farge,
        width: [[0, '2.5px'], [8, '1px']],
      },
    },
  }
  if (kode === opplystKode) {
    const lines = layer.draw.mu_lines
    lines.width = '3px'
  }
  return layer
}

function lagPolygonlag(lag, opplystKode, layers) {
  const { kode, farge } = lag
  const layer = lagDrawblokk(kode, farge, opplystKode)
  layer.data = lagSource(kode)
  layers[kode] = layer
}

function lagToppnivå(props) {
  const bakgrunn = props.aktiveLag[0] //fy
  const config = {
    import: imports,
    sources: createSources(props.aktiveLag),
    lights: createLights(),
    layers: {},
    styles: createStyles(),
    scene: {
      background: { color: bakgrunn.land ? bakgrunn.landfarge : '#ccc' },
    },
  }

  return config
}

function createScene(props: Object, onClick: Function) {
  let config = lagToppnivå(props)
  const iKatalog = !!props.meta
  if (iKatalog) {
    config.layers = lagKatalogLag(
      props.meta.kode,
      props.meta.barn || { [props.meta.kode]: props.meta },
      props.opplystKode
    )
  }
  config.layers = Object.assign(
    config.layers,
    lagAktiveLag(props.aktiveLag, iKatalog, props.opplystKode)
  )
  return config
}

export { createScene }
