// @flow
import Tangram from 'tangram/dist/tangram.debug'
import imports from './import'
import { createSources } from './sources'
import { createStyles } from './styles'
import { createLights } from './lights'

const mi_6se = {
  subkoder: [1, 2, 3, 4, 5],
  farger: [
    [0.243137, 0.254902, 0.996078, 0.8],
    [0.384314, 0.505882, 0.996078, 0.8],
    [0.521569, 0.717647, 0.996078, 0.8],
    [0.647059, 0.854902, 1, 0.9],
    [0.792157, 0.960784, 0.996078, 0.9],
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
