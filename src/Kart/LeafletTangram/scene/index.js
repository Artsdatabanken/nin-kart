// @flow
import tinycolor from 'tinycolor2'
import { lagBakgrunnskart } from './bakgrunnskart'
import { createLights } from './lights'
import { createStyles } from './styles'
import { lagTerreng } from './terreng'
import draw from './visualisering/'

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
    default:
      mekkSettMedLag(lag, opplystKode, config, viserKatalog)
  }
}

function lagKatalogLag(drawArgs, config) {
  const viz = draw[drawArgs.sourceType]
  if (!viz) {
    console.warn('Unknown viz', drawArgs.sourceType)
    return
  }
  let layer = {
    data: viz.lagPekerTilSource(drawArgs.kode),
  }

  viz.drawAll(drawArgs, layer)

  viz.lagSource(drawArgs.kode, drawArgs.bbox, drawArgs.zoom, config)
  console.log(layer)
  config.layers[drawArgs.kode] = layer
}

function farge(farge, viserKatalog) {
  farge = viserKatalog
    ? tinycolor(farge)
        .lighten(20)
        .toRgbString()
    : farge
  return farge
}

function mekkSettMedLag(lag, opplystKode, config, viserKatalog) {
  let drawArgs = {
    forelderkode: lag.kode,
    kode: lag.kode,
    barn: lag.barn.reduce((acc, e) => {
      acc[e.kode] = e
      return acc
    }),
    farge: farge(lag.farge, viserKatalog),
    visEtiketter: lag.visEtiketter,
    opplystKode: opplystKode,
    bbox: lag.bbox,
    zoom: lag.zoom,
    type: lag.type,
    sourceType: lag.sourceType,
    fileFormat: lag.fileFormat,
    visBarn: lag.visBarn,
  }
  console.log('mekk', drawArgs)
  lagKatalogLag(drawArgs, config)
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
    console.log(meta)
    const formats = meta.formats || { polygon: 'pbf' }
    const sourceType = Object.keys(formats)[0]
    const fileFormat = formats[sourceType]
    const drawArgs = {
      kode: meta.kode,
      barn: meta.barn || { [props.meta.kode]: props.meta },
      opplystKode: props.opplystKode,
      bbox: meta.bbox,
      zoom: meta.zoom,
      sourceType: sourceType,
      fileFormat: fileFormat,
    }

    console.log('kata', drawArgs)
    lagKatalogLag(drawArgs, config)
  }
  lagAktiveLag(props.aktiveLag, viserKatalog, props.opplystKode, config)
  return config
}

export { createScene, updateScene }
