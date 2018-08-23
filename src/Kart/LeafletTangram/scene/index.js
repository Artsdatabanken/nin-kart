// @flow
import { lagBakgrunnskart } from './bakgrunnskart'
import imports from './import'
import { createLights } from './lights'
import { createSources, lagSource } from './sources'
import { createStyles } from './styles'

function lagAktiveLag(aktive, iKatalog, opplystKode, layers) {
  aktive.forEach(lag => lagEttLag(lag, opplystKode, iKatalog, layers))
}

function lagEttLag(lag, opplystKode, viserKatalog, layers) {
  if (!lag.erSynlig) return
  switch (lag.kode) {
    case 'bakgrunnskart':
      lagBakgrunnskart(lag, layers)
      break
    default:
      if (!viserKatalog) lagPolygonlag(lag, opplystKode, layers)
  }
}

function lagKatalogLag(forelderkode, barn, opplystKode, layers) {
  let layer = {
    data: lagSource(forelderkode),
  }
  Object.keys(barn).forEach(kode => {
    const visEtiketter = kode === opplystKode
    layer[kode] = lagDrawblokk(
      kode,
      barn[kode].farge,
      opplystKode,
      visEtiketter
    )
  })
  layers[forelderkode] = layer
}

function lagDrawblokk(kode, farge, opplystKode, visEtiketter) {
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
  if (visEtiketter) {
    layer.draw.text = {
      text_source: ['title', 'function() {  return Object.keys(feature)[0]}'],
      font: {
        family: 'Roboto',
        fill: '#fff',
        stroke: { color: '#666', width: 2 },
        size: '13px',
      },
    }
  }
  return layer
}

function lagPolygonlag(lag, opplystKode, layers) {
  const { kode, farge, visEtiketter } = lag
  const layer = lagDrawblokk(kode, farge, opplystKode, visEtiketter)
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
  const viserKatalog = !!props.meta
  if (viserKatalog) {
    lagKatalogLag(
      props.meta.kode,
      props.meta.barn || { [props.meta.kode]: props.meta },
      props.opplystKode,
      config.layers,
      true
    )
  }
  lagAktiveLag(props.aktiveLag, viserKatalog, props.opplystKode, config.layers)
  return config
}

export { createScene }
