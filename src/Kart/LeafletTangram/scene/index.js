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
  return { [kode]: r }
}

function tempHackKode(kode) {
  const subst = kodeMap[kode]
  if (subst) return subst
  return kode
}

const kodeMap = {
  BS_6SE: '6SE',
}

const layerMap = {
  BS_6SE: { source: 'bs_6se', layer: 'Seksjoner2017_4326-c6e9g5' },
  NA: { source: 'na', layer: 'naturomrader8-10tcn5' },
}

function createLayer(kode, meta) {
  const data = layerMap[kode]
  const r = createSubLayers(kode, meta, data)
  console.log(r)
  return r
}

function createLeafletLayer(props) {
  console.log(props)
  let def = {
    scene: {
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
    },
    attribution:
      '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | <a href="http://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a> | <a href="https://www.nextzen.com/" target="_blank">Nextzen</a>',
  }
  if (props.meta && props.meta.barn)
    def.scene.layers = createLayer(props.meta.kode, props.meta.barn)
  let layer = Tangram.leafletLayer(def)
  return layer
}

export { createLeafletLayer }
