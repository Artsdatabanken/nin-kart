// @flow
import tinycolor from 'tinycolor2'
import { lagBakgrunnskart } from './bakgrunnskart'
import { createLights } from './lights'
import { lagPekerTilSource, lagSource } from './sources'
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

function lagKatalogLag({ kode, barn, opplystKode, bbox, zoom }, config) {
  let layer = {
    data: lagPekerTilSource(kode),
  }
  Object.keys(barn).forEach(barnkode => {
    const visEtiketter = barnkode === opplystKode
    layer[barnkode] = lagDrawblokk({
      kode: barnkode,
      forelderkode: kode,
      farge: barn[barnkode].farge,
      opplystKode: opplystKode,
      visEtiketter: visEtiketter,
    })
  })
  lagSource(kode, bbox, zoom, config)
  config.layers[kode + '_kat'] = layer
}

function lagDrawblokk({
  kode,
  forelderkode,
  farge,
  opplystKode,
  visEtiketter,
  visualisering = 'polygon',
}) {
  farge = opplystKode === kode ? '#f88' : farge
  const layer = {
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
  if (kode !== forelderkode) layer.filter = { code: kode }
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
  bbox,
  zoom,
  config
) {
  const layer = lagDrawblokk({
    kode: kode,
    forelderkode: forelderkode,
    farge: farge,
    opplystKode: opplystKode,
    visEtiketter: visEtiketter,
  })
  layer.data = lagPekerTilSource(forelderkode)
  lagSource(forelderkode, bbox, zoom, config)
  config.layers[kode] = layer
}

function farge(farge, viserKatalog) {
  farge = viserKatalog
    ? tinycolor(farge)
        .lighten(20)
        .toRgbString()
    : farge
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
          lag.bbox,
          lag.zoom,
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
      lag.bbox,
      lag.zoom,
      config
    )
}

function finnLagType(aktiveLag, type) {
  for (let lag of aktiveLag) if (lag.type === type) return lag
}

function lagToppnivå(props) {
  const bakgrunn = finnLagType(props.aktiveLag, 'bakgrunn')
  const config = {
    sources: {
      osm: {
        type: 'MVT',
        url:
          'https://nintest.artsdatabanken.no/basemap/openstreetmap/{z}/{x}/{y}',
        max_zoom: 14,
      },
    },
    cameras: {
      cam: {
        type: 'flat',
      },
    },
    lights: createLights(),
    layers: {},
    styles: createStyles(),
    scene: {
      background: { color: bakgrunn.land ? bakgrunn.landfarge : '#ccc' },
    },
  }

  return config
}

function createScene(props: Object) {
  let config = lagToppnivå(props)
  updateScene(config, props)
  return config
}

function updateScene(config: Object, props: Object) {
  config.layers = {}
  const meta = props.meta
  const viserKatalog = !!meta
  if (viserKatalog) {
    lagKatalogLag(
      {
        kode: meta.kode,
        barn: meta.barn || { [props.meta.kode]: props.meta },
        opplystKode: props.opplystKode,
        bbox: meta.bbox,
        zoom: meta.zoom,
      },
      config
    )
  }
  lagAktiveLag(props.aktiveLag, viserKatalog, props.opplystKode, config)
  return config
}

export { createScene, updateScene }
