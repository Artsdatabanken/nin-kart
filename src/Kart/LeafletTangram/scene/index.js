// @flow
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

function bakgrunnskartlag(kode, erSynlig, style, farge, lag) {
  let mal = bakgrunnskartTemplate[kode]
  mal.draw[style].color = farge
  if (erSynlig) lag[kode] = mal
}

function lagBakgrunnskart(lag, r) {
  const grenser = {
    data: {
      source: 'osm',
      layer: 'boundary',
    },
  }
  bakgrunnskartlag(
    'land',
    lag.kommunegrense,
    'boundary',
    lag.kommunegrensefarge,
    grenser
  )
  bakgrunnskartlag(
    'land',
    lag.fylkesgrense,
    'boundary',
    lag.fylkesgrensefarge,
    grenser
  )
  bakgrunnskartlag(
    'land',
    lag.landegrense,
    'boundary',
    lag.landegrensefarge,
    grenser
  )
  r[lag.kode] = grenser
  bakgrunnskartlag('vann', lag.vann, 'polygons', lag.vannfarge, r)
  bakgrunnskartlag('vannvei', lag.vann, 'lines', lag.vannfarge, r)
  bakgrunnskartlag(
    'transport',
    lag.transport,
    'mu_lines',
    lag.transportfarge,
    r
  )
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
      mu_polygons: {
        order: 100,
        color: lag.farge || '#f6c',
      },
      mu_lines: {
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

function hack(prefix) {
  // Fordi data ikke alltid ligger der man skulle tro.
  switch (prefix) {
    case 'BS':
    case 'RL':
      return 'NA'
    default:
      return prefix
  }
}

function masser(kode, farge, dimAlleUnntatt) {
  if (dimAlleUnntatt === kode) return '#f00'
  return farge
}

function lagLagForKatalog(kode, barn, dimAlleUnntatt) {
  let r = {}
  const prefix = hack(kode.substring(0, 2))
  r.data = { source: prefix, layer: prefix }
  Object.keys(barn).forEach(subkode => {
    let farge = masser(subkode, barn[subkode].farge || '#f6c', dimAlleUnntatt)
    console.log(kode, barn[subkode].farge, farge, dimAlleUnntatt)
    const sub = {
      filter: { [subkode]: true },
      draw: {
        polygons: {
          order: 100,
          color: farge,
        },
        mu_lines: {
          order: 100,
          color: farge,
          width: [[0, '2.5px'], [8, '1px']],
        },
      },
    }
    if (subkode === dimAlleUnntatt) {
      const lines = sub.draw.mu_lines
      lines.width = '1.5px'
      //      lines.color = '#333'
    }
    r[subkode] = sub
  })
  return { [kode]: r }
}

function makeScene(props) {
  const r = {
    import: imports,
    sources: createSources(props.aktiveLag),
    lights: createLights(),
    layers: {},
    styles: createStyles(),
  }

  const bakgrunn = props.aktiveLag[0] //fy
  if (bakgrunn.land)
    r.scene = {
      background: { color: bakgrunn.landfarge },
    }

  return r
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
