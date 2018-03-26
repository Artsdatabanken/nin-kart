<<<<<<< HEAD
// @flow
import Tangram from 'tangram/dist/tangram.debug'
import imports from './import'
import { createSources } from './sources'
import { createStyles } from './styles'
import { createLights } from './lights'

function createSubLayers(kode, barn, data) {
  let r = {}
  r.data = data
  Object.keys(barn).forEach(subkode => {
    console.log(kode, subkode)
    let frag = subkode[subkode.length - 1]
    if (parseInt(frag, 10)) frag = parseInt(frag, 10)
    const sub = {
      filter: { [tempHackKode(kode)]: frag },
      draw: { _transparent: { order: 100, color: barn[subkode].farge } },
    }
    console.log(sub.filter)
    r[subkode] = sub
  })
  console.log('r', r)
  return { [kode]: r }
}

function tempHackKode(kode) {
  const subst = kodeMap[kode]
  if (subst) return subst
  return kode.toLowerCase()
}

const kodeMap = {
  BS_6SE: '6SE',
}

const layerMap = {
  BS_6SE: { source: 'bs_6se', layer: 'Seksjoner2017_4326-c6e9g5' },
  NA: { source: 'na', layer: 'naturomrader8-10tcn5' },
  MI_KA: { source: 'mi_ka', layer: 'mi_ka-07l592' },
}

function createLayer(kode, meta) {
  const data = layerMap[kode]
  const r = createSubLayers(kode, meta, data)
  console.log(r)
  return r
}

function makeScene(props) {
  return {
    import: imports,
    sources: createSources(props.aktivKode),
    lights: createLights(),
    layers: {},
    layers2: {
      earth: {
        data: { source: 'mapzen' },
        draw: { elevation: { order: 44440 } },
      },
    },
    styles: createStyles(),
  }
}

const _def = {
  scene: {
    import: [
      'https://www.nextzen.org/carto/refill-style/11/refill-style.zip',
      'https://www.nextzen.org/carto/bubble-wrap-style/8/themes/label-10.zip',
    ],
    sources: {
      og: {
        type: 'MVT',
        url:
          'https://a.tiles.mapbox.com/v4/artsdatabanken.bthj0gsg,artsdatabanken.9fqc3l9i,artsdatabanken.7hhxtxe3,artsdatabanken.dz9161rw,artsdatabanken.0n0rw38p,artsdatabanken.0183w0w7,artsdatabanken.0hbp7082,artsdatabanken.7676pvsx,artsdatabanken.6j8o5925,artsdatabanken.6rbfhi3x,artsdatabanken.d1s080yu,artsdatabanken.2v0t4l8r/{z}/{x}/{y}.vector.pbf?access_token=pk.eyJ1IjoiYXJ0c2RhdGFiYW5rZW4iLCJhIjoiY2pjNjg2MzVzMHhycjJ3bnM5MHc4MHVzOCJ9.fLnCRyg-hCuTClyim1r-JQ',
        max_zoom: 16,
      },
      bs_6se: {
        type: 'MVT',
        url:
          'https://a.tiles.mapbox.com/v4/artsdatabanken.7hhxtxe3/{z}/{x}/{y}.vector.pbf?access_token=pk.eyJ1IjoiYXJ0c2RhdGFiYW5rZW4iLCJhIjoiY2pjNjg2MzVzMHhycjJ3bnM5MHc4MHVzOCJ9.fLnCRyg-hCuTClyim1r-JQ',
        max_zoom: 16,
      },
      na: {
        type: 'MVT',
        url:
          'https://a.tiles.mapbox.com/v4/artsdatabanken.8z9eimla,artsdatabanken.bthj0gsg,artsdatabanken.9fqc3l9i,artsdatabanken.7hhxtxe3,artsdatabanken.dz9161rw,artsdatabanken.0n0rw38p,artsdatabanken.0183w0w7,artsdatabanken.0hbp7082,artsdatabanken.7676pvsx,artsdatabanken.6j8o5925,artsdatabanken.6rbfhi3x,artsdatabanken.d1s080yu,artsdatabanken.2v0t4l8r/{z}/{x}/{y}.vector.pbf?access_token=pk.eyJ1IjoiYXJ0c2RhdGFiYW5rZW4iLCJhIjoiY2pjNjg2MzVzMHhycjJ3bnM5MHc4MHVzOCJ9.fLnCRyg-hCuTClyim1r-JQ',
        url2:
          'https://a.tiles.mapbox.com/v4/artsdatabanken.8z9eimla/{z}/{x}/{y}.vector.pbf?access_token=pk.eyJ1IjoiYXJ0c2RhdGFiYW5rZW4iLCJhIjoiY2pjNjg2MzVzMHhycjJ3bnM5MHc4MHVzOCJ9.fLnCRyg-hCuTClyim1r-JQ',
      },
      'terrain-normals': {
        type: 'Raster',
        url2:
          'https://tile.nextzen.com/nextzen/terrain/v1/normal/{z}/{x}/{y}.png',
        url3:
          'https://tile.nextzen.org/tilezen/terrain/v1/256/normal/{z}/{x}/{y}.png?api_key=Tqy6UAn9ShClyvfUon001g',
        url: 'http://localhost:8081/dummymap/',
      },
      mapzen: {
        url:
          'https://{s}.tile.nextzen.org/tilezen/vector/v1/512/all/{z}/{x}/{y}.mvt',
        url_subdomains: ['a', 'b', 'c', 'd'],
        url_params: { api_key: 'Tqy6UAn9ShClyvfUon001g' },
        tile_size: 512,
        max_zoom: 16,
        rasters: ['terrain-normals'],
      },
    },
    lights: {
      point1: {
        type: 'directional',
        direction: [0, 1, -0.5],
        diffuse: 1,
        ambient: 0.3,
      },
    },
    layers: {
      BS_6SE: {
        data: { source: 'bs_6se', layer: 'Seksjoner2017_4326-c6e9g5' },
        'BS_6SE-1': {
          filter: { '6SE': 1 },
          draw: { _transparent: { order: 100, color: '#fee08b' } },
        },
        'BS_6SE-2': {
          filter: { '6SE': 2 },
          draw: { _transparent: { order: 100, color: '#e6f598' } },
        },
        'BS_6SE-3': {
          filter: { '6SE': 3 },
          draw: { _transparent: { order: 100, color: '#abdda4' } },
        },
        'BS_6SE-4': {
          filter: { '6SE': 4 },
          draw: { _transparent: { order: 100, color: '#66c2a5' } },
        },
        'BS_6SE-5': {
          filter: { '6SE': 5 },
          draw: { _transparent: { order: 100, color: '#3288bd' } },
        },
        'BS_6SE-6': {
          filter: { '6SE': 6 },
          draw: { _transparent: { order: 100, color: '#d53e4f' } },
        },
      },
    },
    layers2: {
      earth: {
        data: { source: 'mapzen' },
        draw: { elevation: { order: 44440 } },
      },
    },
    styles: {
      normals: { base: 'polygons', raster: 'normal' },
      elevation: {
        base: 'polygons',
        raster: 'custom',
        shaders: {
          blocks: {
            global:
              '\n                    float unpack(vec4 h) {\n                        return (h.r * 1. + h.g / 256. + h.b / 65536.);\n                    }',
            color:
              '\n//                    color.rgb = vec3(sampleRaster(0).r);\n                    color.rgb = vec3(0.4,0.4,1.);\n                    color.a = vec3(sampleRaster(0)).r;\n                    ',
          },
        },
      },
      _transparent: { base: 'polygons', blend: 'multiply' },
      _dashes2: { base: 'polygons' },
      naturomrader6: { base: 'polygons' },
    },
  },
  attribution:
    '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | <a href="http://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a> | <a href="https://www.nextzen.com/" target="_blank">Nextzen</a>',
  showDebug: false,
}

function createLeafletLayer(props: Object, onClick: Function) {
  let def = {
    scene: makeScene(props),
    events: {
      hover: function(selection) {
        //        console.log('Hover!', selection)
      },
      click: onClick,
    },
    attribution:
      '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | <a href="http://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a> | <a href="https://www.nextzen.com/" target="_blank">Nextzen</a>',
  }

  if (props.meta && props.meta.barn)
    def.scene.layers = createLayer(props.meta.kode, props.meta.barn)

  let layer = Tangram.leafletLayer(def)
  return layer
}

export { makeScene, createLeafletLayer }
||||||| merged common ancestors
=======
import Tangram from 'tangram/dist/tangram.debug'
import imports from './import'
import { createSources } from './sources'
import { createStyles } from './styles'
import { createLights } from './lights'
import MI_6SE from '../MI_6SE'

function createSubLayers(kode) {
  return {
    '6SE-1': {
      filter: { '6SE': 1 },
      draw: {
        _transparent: {
          order: 100,
          color: [62 / 255.0, 65 / 255.0, 254 / 255.0, 0.8],
        },
      },
    },
    '6SE-2': {
      filter: { '6SE': 2 },
      draw: {
        _transparent: {
          order: 100,
          color: [98 / 255.0, 129 / 255.0, 254 / 255.0, 0.8],
        },
      },
    },
    '6SE-3': {
      filter: { '6SE': 3 },
      draw: {
        _transparent: {
          order: 100,
          color: [133 / 255.0, 183 / 255.0, 254 / 255.0, 0.8],
        },
      },
    },
    '6SE-4': {
      filter: { '6SE': 4 },
      draw: {
        _transparent: {
          order: 100,
          color: [165 / 255.0, 218 / 255.0, 255 / 255.0, 0.9],
        },
      },
    },
    '6SE-5': {
      filter: { '6SE': 5 },
      draw: {
        _transparent: {
          order: 100,
          color: [202 / 255.0, 245 / 255.0, 254 / 255.0, 0.9],
        },
      },
    },
  }
}

function createLayer(kode) {
  const r = {
    [kode]: {
      data: { source: 'og', layer: 'Seksjoner2017_4326-c6e9g5' },
      ...createSubLayers(kode),
    },
  }
  console.log(r)
  return r
}

function createLeafletLayer(props) {
  console.log(props)
  const a = JSON.stringify(MI_6SE)
  const b = JSON.stringify(createLayer('6SE'))
  console.warn(a)
  console.warn(b)
  if (a !== b) console.error('DIFF')
  let layer = Tangram.leafletLayer({
    scene: {
      import: imports,
      sources: createSources(props.aktivKode),
      lights: createLights(),
      layers: createLayer('6SE'),
      layers5: MI_6SE,
      layers2: {
        earth: {
          data: { source: 'mapzen' },
          draw: {
            elevation: {
              order: 44440,
            },
          },
        },
      },
      styles: createStyles(),
    },

    attribution:
      '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | <a href="http://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a> | <a href="https://www.nextzen.com/" target="_blank">Nextzen</a>',
  })
  return layer
}

export { createLeafletLayer }
>>>>>>> Dynamic styling start
