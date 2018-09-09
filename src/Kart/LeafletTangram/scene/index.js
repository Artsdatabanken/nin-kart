// @flow
import tinycolor from 'tinycolor2'
import { lagBakgrunnskart } from './bakgrunnskart'
import imports from './import'
import { createLights } from './lights'
import { lagLayerSource, lagSource } from './sources'
import { createStyles } from './styles'
import { lagTerreng } from './terreng'

function lagAktiveLag(aktive, iKatalog, opplystKode, config) {
  aktive.forEach(lag => lagEttLag(lag, opplystKode, iKatalog, config))
}

function lagEttLag(lag, opplystKode, viserKatalog, config) {
  if (!lag.erSynlig) return
  switch (lag.type) {
    case 'bakgrunn':
      lagBakgrunnskart(lag, config)
      break
    case 'terreng':
      lagTerreng(lag, config)
      break
    case 'polygon':
      lagPolygonlag(lag, opplystKode, config, viserKatalog)
      return
    default:
      console.error('Ukjent lag', lag.type)
  }
}

function lagKatalogLag(kode, barn, opplystKode, config) {
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
  lagSource(kode, config)
  config.layers[kode + '_kat'] = layer
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
        fill: 'hsla(0, 0%, 100%, 1.0)',
        stroke: { color: 'hsla(0, 0%, 0%, 0.7)', width: 2 },
        size: '13px',
      },
    }
  }
  return layer
}

function lagEttPolygonLag(
  forelderkode,
  kode,
  farge,
  visEtiketter,
  opplystKode,
  config
) {
  const layer = lagDrawblokk(kode, farge, opplystKode, visEtiketter)
  layer.data = lagLayerSource(forelderkode)
  lagSource(forelderkode, config)
  config.layers[kode] = layer
}

function farge(farge, viserKatalog) {
  farge = viserKatalog
    ? tinycolor(farge)
        .lighten(20)
        .toRgbString()
    : farge
  console.log(farge)
  return farge
}

function lagPolygonlag(lag, opplystKode, config, viserKatalog) {
  if (lag.visBarn)
    Object.keys(lag.barn).forEach(i => {
      const barn = lag.barn[i]
      if (barn.erSynlig) {
        lagEttPolygonLag(
          lag.kode,
          barn.kode,
          farge(barn.farge, viserKatalog),
          lag.visEtiketter,
          opplystKode,
          config
        )
      }
    })
  else
    lagEttPolygonLag(
      lag.kode,
      lag.kode,
      farge(lag.farge, viserKatalog),
      lag.visEtiketter,
      opplystKode,
      config
    )
}

function finnLagType(aktiveLag, type) {
  for (let lag of aktiveLag) if (lag.type === type) return lag
}

function lagToppnivå(props) {
  const bakgrunn = finnLagType(props.aktiveLag, 'bakgrunn')
  const config = {
    import: imports,
    sources: {},
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
      config
    )
  }
  lagAktiveLag(props.aktiveLag, viserKatalog, props.opplystKode, config)
  return config
}

export { createScene }
