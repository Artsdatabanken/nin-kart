// @flow
import Tangram from 'tangram/dist/tangram.debug'
import imports from './import'
import { createLights } from './lights'
import { createSources } from './sources'
import { createStyles } from './styles'

function lagLagForAktive(aktive) {
  let r = {}
  aktive.forEach(lag => {
    const kode = lag.kode
    const prefix = kode.substring(0, 2)
    const sub = {
      data: {
        source: prefix,
        layer: prefix,
      },
      filter: { [kode]: true },
      draw: {
        _multiply: {
          order: 100,
          color: lag.farge || '#f6c',
        },
        lines: {
          order: 90,
          color: '#888',
          width: '5m',
        },
      },
    }
    r[kode] = sub
  })
  return r
}

function lagLagForKatalog(kode, barn) {
  let r = {}
  const prefix = kode.substring(0, 2)
  r.data = { source: prefix, layer: prefix }
  Object.keys(barn).forEach(subkode => {
    const sub = {
      filter: { [subkode]: true },
      draw: {
        _multiply: {
          order: 100,
          color: barn[subkode].farge || '#f6c',
        },
        lines: {
          order: 90,
          color: '#888',
          width: '5m',
        },
      },
    }
    r[subkode] = sub
  })
  return { [kode]: r }
}

function makeScene(props) {
  return {
    import: imports,
    sources: createSources(props.aktiveLag),
    lights: createLights(),
    layers: {},
    styles: createStyles(),
  }
}

function createLeafletLayer(props: Object, onClick: Function) {
  let def = {
    scene: makeScene(props),
    events: {
      hover: function(selection) {
        console.log('Hover!', selection)
      },
      click: onClick,
    },
    attribution:
      '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | <a href="http://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a> | <a href="https://www.nextzen.com/" target="_blank">Nextzen</a>',
  }

  if (props.aktivKode)
    def.scene.layers = lagLagForKatalog(
      props.aktivKode,
      props.meta.barn || { [props.meta.kode]: props.meta }
    )
  else def.scene.layers = lagLagForAktive(props.aktiveLag)

  let layer = Tangram.leafletLayer(def)
  return layer
}

export { makeScene, createLeafletLayer }
