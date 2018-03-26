// @flow
import Tangram from 'tangram/dist/tangram.debug'
import imports from './import'
import { createSources } from './sources'
import { createStyles } from './styles'
import { createLights } from './lights'
import MI_6SE from '../MI_6SE'

const mi_6se = {
  subkoder: [1, 2, 3, 4, 5],
  farger: [
    [62 / 255.0, 65 / 255.0, 254 / 255.0, 0.8],
    [98 / 255.0, 129 / 255.0, 254 / 255.0, 0.8],
    [133 / 255.0, 183 / 255.0, 254 / 255.0, 0.8],
    [165 / 255.0, 218 / 255.0, 255 / 255.0, 0.9],
    [202 / 255.0, 245 / 255.0, 254 / 255.0, 0.9],
  ],
}

function createSubLayers(kode, meta) {
  let r = {}
  for (let i = 0; i < meta.subkoder.length; i++) {
    const subkode = meta.subkoder[i]
    const farge = meta.farger[i]
    r[kode + '-' + subkode] = {
      filter: { [kode]: subkode },
      draw: {
        _transparent: {
          order: 100,
          color: farge,
        },
      },
    }
  }
  return r
}

function createLayer(kode, meta) {
  const r = {
    [kode]: {
      data: { source: 'og', layer: 'Seksjoner2017_4326-c6e9g5' },
      ...createSubLayers(kode, meta),
    },
  }
  console.log(r)
  return r
}

function createLeafletLayer(props) {
  console.log(props)
  let layer = Tangram.leafletLayer({
    scene: {
      import: imports,
      sources: createSources(props.aktivKode),
      lights: createLights(),
      layers: createLayer('6SE', mi_6se),
      //      layers6: createLayer('6SE'),
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
