// @flow
import tinycolor from 'tinycolor2'
import { lagBakgrunnskart } from './bakgrunnskart'
import imports from './import'
import { createLights } from './lights'
import { lagLayerSource, lagSources } from './sources'
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

function lagKatalogLag(kode, barn, opplystKode, layers) {
  let layer = {
    data: lagLayerSource(kode),
  }
  Object.keys(barn).forEach(barnkode => {
    const visEtiketter = barnkode === opplystKode
    layer[barnkode] = lagDrawblokk(
      barnkode,
      barn[barnkode].farge,
      opplystKode,
      visEtiketter
    )
  })
  layers[kode] = layer
}

function lagDrawblokk(kode, farge, opplystKode, visEtiketter) {
  farge = opplystKode === kode ? '#f88' : farge
  const layer = {
    filter: { code: kode },
    draw: {
      mu_polygons: {
        order: 100,
        color: farge,
      },
      lines: {
        order: 100,
        color: tinycolor(farge)
          .darken(30)
          .toHexString(),
        width: '1.0px',
      },
    },
  }
  if (kode === opplystKode) {
    const lines = layer.draw.lines
    lines.width = '2px'
  }
  if (visEtiketter) {
    layer.draw.text = {
      text_source: ['name', 'title'],
      font: {
        family: 'Roboto',
        fill: '#444',
        stroke: { color: '#aaa', width: 3 },
        size: '13px',
      },
    }
  }
  return layer
}

function lagEttPolygonLag(kode, farge, visEtiketter, opplystKode, layers) {
  const layer = lagDrawblokk(kode, farge, opplystKode, visEtiketter)
  layer.data = lagLayerSource(kode)
  layers[kode] = layer
}

function lagPolygonlag(lag, opplystKode, layers) {
  if (lag.visBarn)
    Object.keys(lag.barn).forEach(i => {
      const barn = lag.barn[i]
      if (barn.erSynlig)
        lagEttPolygonLag(
          barn.kode,
          barn.farge,
          lag.visEtiketter,
          opplystKode,
          layers
        )
    })
  else
    lagEttPolygonLag(lag.kode, lag.farge, lag.visEtiketter, opplystKode, layers)
}

function lagToppnivå(props) {
  const bakgrunn = props.aktiveLag[0] //fy
  const config = {
    import: imports,
    sources: lagSources(props.aktiveLag, props.meta && props.meta.kode),
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
      config.layers
    )
  }
  lagAktiveLag(props.aktiveLag, viserKatalog, props.opplystKode, config.layers)
  return config
}

export { createScene }
