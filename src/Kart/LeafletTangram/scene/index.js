// @flow
import { lagBakgrunnskart } from './bakgrunnskart'
import imports from './import'
import { createLights } from './lights'
import { createSources } from './sources'
import { createStyles } from './styles'

function lagLag(lag, opplystKode, iKatalog, r) {
  if (!lag.erSynlig) return
  switch (lag.kode) {
    case 'bakgrunnskart':
      lagBakgrunnskart(lag, r)
      break
    default:
      if (!iKatalog) lagPolygonlag(lag, opplystKode, r)
  }
}

function lagLagForKatalog(forelderkode, barn, opplystKode) {
  let layer = {
    data: lagSource(forelderkode),
  }
  Object.keys(barn).forEach(kode => {
    layer[kode] = lagSøl(kode, barn[kode].farge, opplystKode)
  })
  return { [forelderkode]: layer }
}

function lagSøl(kode, farge, opplystKode) {
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
  const kode = lag.kode
  const layer = lagSøl(lag.kode, lag.farge, opplystKode)
  layer.data = lagSource(kode)
  layers[kode] = layer
}

function lagLagForAktive(aktive, iKatalog, dimAlleUnntatt) {
  let r = {}
  aktive.forEach(lag => {
    lagLag(lag, dimAlleUnntatt, iKatalog, r)
  })
  return r
}

function lagSource(kode) {
  const prefix = hack(kode.substring(0, 2))
  return { source: prefix, layer: prefix }
}

function hack(prefix) {
  // Fordi data ikke alltid ligger der man skulle tro.
  switch (prefix) {
    case 'BS':
    case 'RL':
      return 'NA'
    default:
      return prefix
  }
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
    config.layers = lagLagForKatalog(
      props.meta.kode,
      props.meta.barn || { [props.meta.kode]: props.meta },
      props.opplystKode
    )
  }
  config.layers = Object.assign(
    config.layers,
    lagLagForAktive(props.aktiveLag, iKatalog, props.opplystKode)
  )
  return config
}

export { createScene }
