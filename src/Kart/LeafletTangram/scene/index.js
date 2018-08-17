// @flow
import imports from './import'
import { createLights } from './lights'
import bakgrunnskartTemplate from './mal/bakgrunnskart'
import { createSources } from './sources'
import { createStyles } from './styles'

function lagLag(lag, r) {
  switch (lag.kode) {
    case 'bakgrunnskart':
      return lagBakgrunnskart(lag, r)
    default:
      return lagPolygonlag(lag, r)
  }
}

function lagBakgrunnskart(lag, r) {
  const bg = {
    data: {
      source: 'osm',
      layer: 'boundary',
    },
  }
  if (lag.landegrense) bg.land = bakgrunnskartTemplate.land
  if (lag.fylkesgrense) bg.fylke = bakgrunnskartTemplate.fylke
  if (lag.kommunegrense) bg.kommune = bg.kommune = bakgrunnskartTemplate.kommune
  r[lag.kode] = bg
  if (lag.transport) r['transport'] = bakgrunnskartTemplate.transport
  if (lag.vann) r['vann'] = bakgrunnskartTemplate.vann
  if (lag.vannvei) r['vannvei'] = bakgrunnskartTemplate.vannvei
}

function lagPolygonlag(lag, r) {
  const kode = lag.kode
  const prefix = kode.substring(0, 2)
  r[kode] = {
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
}

function lagLagForAktive(aktive) {
  let r = {}
  aktive.forEach(lag => {
    if (lag.erSynlig) lagLag(lag, r)
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

function createScene(props: Object, onClick: Function) {
  let scene = makeScene(props)
  if (props.meta)
    scene.layers = lagLagForKatalog(
      props.meta.kode,
      props.meta.barn || { [props.meta.kode]: props.meta }
    )
  else scene.layers = lagLagForAktive(props.aktiveLag)
  return scene
}

export { makeScene, createScene }
