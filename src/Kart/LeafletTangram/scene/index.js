// @flow
import tinycolor from 'tinycolor2'
import { lagBakgrunnskart } from './bakgrunnskart'
import imports from './import'
import { createLights } from './lights'
import { lagLayerSource, lagSources } from './sources'
import { createStyles } from './styles'
import { lagTerreng } from './terreng'

function lagAktiveLag(aktive, iKatalog, opplystKode, layers) {
  aktive.forEach(lag => lagEttLag(lag, opplystKode, iKatalog, layers))
}

function lagEttLag(lag, opplystKode, viserKatalog, layers) {
  if (!lag.erSynlig) return
  switch (lag.type) {
    case 'bakgrunn':
      lagBakgrunnskart(lag, layers)
      break
    case 'terreng':
      lagTerreng(lag, layers)
      break
    case 'polygon':
      lagPolygonlag(lag, opplystKode, layers, viserKatalog)
      return
    default:
      console.error('Ukjent lag', lag.type)
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
  layers[kode + '_kat'] = layer
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
  layers
) {
  const layer = lagDrawblokk(kode, farge, opplystKode, visEtiketter)
  layer.data = lagLayerSource(forelderkode)
  layers[kode] = layer
}

function lagPolygonlag(lag, opplystKode, layers, viserKatalog) {
  if (lag.visBarn)
    Object.keys(lag.barn).forEach(i => {
      const barn = lag.barn[i]
      if (barn.erSynlig) {
        const farge = viserKatalog
          ? tinycolor(barn.farge)
              .setAlpha(0.2)
              .toRgbString()
          : barn.farge
        lagEttPolygonLag(
          lag.kode,
          barn.kode,
          farge,
          lag.visEtiketter,
          opplystKode,
          layers
        )
      }
    })
  else
    lagEttPolygonLag(lag.kode, lag.farge, lag.visEtiketter, opplystKode, layers)
}

function finnLagType(aktiveLag, type) {
  for (let lag of aktiveLag) if (lag.type === type) return lag
}

function lagToppnivå(props) {
  const bakgrunn = finnLagType(props.aktiveLag, 'bakgrunn')
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
