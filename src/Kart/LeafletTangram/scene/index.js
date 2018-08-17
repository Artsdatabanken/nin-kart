// @flow
import color from 'tinycolor2'
import imports from './import'
import { createLights } from './lights'
import bakgrunnskartTemplate from './mal/bakgrunnskart'
import { createSources } from './sources'
import { createStyles } from './styles'

function lagLag(lag, dimAlleUnntatt, iKatalog, r) {
  switch (lag.kode) {
    case 'bakgrunnskart':
      lagBakgrunnskart(lag, r)
      break
    default:
      if (!iKatalog) lagPolygonlag(lag, dimAlleUnntatt, r)
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

function lagPolygonlag(lag, dimAlleUntatt, r) {
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

function lagLagForAktive(aktive, iKatalog, dimAlleUnntatt) {
  let r = {}
  aktive.forEach(lag => {
    if (lag.erSynlig) lagLag(lag, dimAlleUnntatt, iKatalog, r)
  })
  return r
}

function masser(kode, farge, dimAlleUnntatt) {
  if (!dimAlleUnntatt) return farge
  const col = new color(farge)
  if (dimAlleUnntatt === kode) return col.darken(20).toHexString()
  return col.brighten(10).toHexString()
}

function lagLagForKatalog(kode, barn, dimAlleUnntatt) {
  let r = {}
  const prefix = kode.substring(0, 2)
  r.data = { source: prefix, layer: prefix }
  Object.keys(barn).forEach(subkode => {
    let farge = masser(subkode, barn[subkode].farge || '#f6c', dimAlleUnntatt)
    const sub = {
      filter: { [subkode]: true },
      draw: {
        _multiply: {
          order: 100,
          color: farge,
        },
        lines: {
          order: 190,
          color: '#666',
          width: '0.5px',
        },
      },
    }
    if (subkode === dimAlleUnntatt) {
      const lines = sub.draw.lines
      lines.width = '1.5px'
      lines.color = '#333'
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
  const dimAlleUnntatt = props.opplystKode
  const iKatalog = !!props.meta
  if (iKatalog) {
    scene.layers = lagLagForKatalog(
      props.meta.kode,
      props.meta.barn || { [props.meta.kode]: props.meta },
      dimAlleUnntatt
    )
  }
  scene.layers = Object.assign(
    scene.layers,
    lagLagForAktive(props.aktiveLag, iKatalog, dimAlleUnntatt)
  )
  return scene
}

export { makeScene, createScene }
