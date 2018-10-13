// @flow
import tinycolor from 'tinycolor2'
import { lagBakgrunnskart } from './bakgrunnskart'
import { createLights } from './lights'
import { createStyles } from './styles'
import { lagTerreng } from './terreng'
import draw from './visualisering/'
import sysconfig from '../../../config'

function lagAktiveLag(aktive, iKatalog, opplystKode, config) {
  Object.keys(aktive).forEach(kode =>
    lagEttLag(aktive[kode], opplystKode, iKatalog, config)
  )
}

function lagEttLag(lag, opplystKode, viserKatalog, config) {
  if (!lag.erSynlig && opplystKode !== lag.kode) return
  switch (lag.type) {
    case 'bakgrunn':
      lagBakgrunnskart(lag, config)
      break
    case 'terreng':
      lagTerreng(lag.terreng, config)
      break
    default:
      opprettAktivtLag(lag, opplystKode, config, viserKatalog)
  }
}

function opprettEttLag(drawArgs, config) {
  const viz = draw[drawArgs.type]
  if (!viz) {
    console.warn('Unknown viz', drawArgs.type)
    return
  }

  const source = viz.lagSource(drawArgs.kode, drawArgs.bbox, drawArgs.zoom)
  if (viz.lagStyle) {
    const style = viz.lagStyle(drawArgs[drawArgs.type])
    config.styles[style.name] = style.value
  }
  config.sources[drawArgs.kode] = source
  config.layers[drawArgs.kode] = viz.drawAll(drawArgs)
}

function farge(farge, viserKatalog) {
  farge = viserKatalog
    ? tinycolor(farge)
        .lighten(20)
        .toRgbString()
    : farge
  return farge
}

function opprettAktivtLag(lag, opplystKode, config, viserKatalog) {
  let drawArgs = {
    forelderkode: lag.kode,
    kode: lag.kode,
    farge: farge(lag.farge, viserKatalog),
    visEtiketter: lag.visEtiketter,
    opplystKode: opplystKode,
    bbox: lag.bbox,
    zoom: lag.zoom,
    type: lag.type,
    fileFormat: lag.fileFormat,
    visBarn: lag.visBarn,
    gradient: lag.gradient,
  }
  if (lag.visBarn) {
    drawArgs.barn = lag.barn.reduce((acc, e) => {
      acc[e.kode] = e
      return acc
    }, {})
  }
  opprettEttLag(drawArgs, config)
}

function lagToppnivå(props) {
  const config = {
    sources: {
      osm: sysconfig.createTileSource('basemap/openstreetmap', 'MVT', [0, 14]),
    },
    cameras: {
      cam: {
        type: 'flat',
      },
    },
    lights: createLights(),
    layers: {},
    styles: createStyles(),
    scene: { background: {} },
  }
  return config
}

function createScene(props: Object) {
  let config = lagToppnivå(props)
  updateScene(config, props)
  return config
}

function updateScene(config: Object, props: Object) {
  const bakgrunn = props.aktiveLag.bakgrunnskart
  config.scene.background.color = bakgrunn.land
    ? bakgrunn.land_farge
    : '#f2f2f2'
  config.layers = {}
  const meta = props.meta
  const viserKatalog = !!meta
  if (viserKatalog) {
    const formats = meta.formats || { polygon: 'pbf' }
    const sourceType = Object.keys(formats)[0]
    const fileFormat = formats[sourceType]
    const drawArgs = {
      kode: meta.kode,
      barn:
        Object.keys(meta.barn).length > 0
          ? meta.barn
          : { [props.meta.kode]: props.meta },
      opplystKode: props.opplystKode,
      bbox: meta.bbox,
      zoom: meta.zoom,
      type: sourceType,
      fileFormat: fileFormat,
      gradient: { filterMin: 0, filterMax: 1 },
      visBarn: Object.keys(meta.barn).length > 0,
    }

    opprettEttLag(drawArgs, config)
  }
  lagAktiveLag(props.aktiveLag, viserKatalog, props.opplystKode, config)
  lagTemp(config)
  return config
}

function lagTemp(config) {
  if (!sysconfig.feature.comboSøk) return false
  const l = {
    data: { source: 'AND' },
    OR_MD: {
      data: { source: 'AND' },
      draw: {
        points: {
          size: 'function() { return (feature.size) * 3 }',
          texture: '/blue.png',
          //          'https://firebasestorage.googleapis.com/v0/b/grunnkart.appspot.com/o/bilde%2Favatar%2F40%2FOR_MD.png?alt=media',
        },
      },
    },
  }

  config.layers.AND = l
  config.sources.AND = {
    type: 'GeoJSON',
    //    url: `http://localhost:8000/dekning.geojson?kode=MI_KA-A&kode=NA_I1`,
    url: `http://localhost:8000/dekning.geojson?kode=NA_I1&kode=MI_KA-B`,
  }
}
export { createScene, updateScene }
