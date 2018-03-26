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
