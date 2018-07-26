// @flow
import Tangram from 'tangram/dist/tangram.debug'
import imports from './import'
import { createLights } from './lights'
import { createSources } from './sources'
import { createStyles } from './styles'

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
    sources: createSources(props.aktiveLag),
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
