import React, { Component } from 'react'
import Listeelement from './Listeelement'

function oppsummer(node) {
  console.warn('inn', node)
  let r = []
  //  oppsummer2(node, r)
  if (node.barn)
    Object.keys(node.barn).forEach(kode => {
      let e = []
      let stack = {}
      oppsummer2(node.barn[kode], stack, e)
      /*    const segs = typesystem.splittKode(kode)
    const pre = segs[0] + '_' + segs[1]
    if (!r[pre]) r[pre] = []*/
      r.push(...e)
    })
  else r.push({ verdi: [node.tittel] })

  console.log('rrr', JSON.stringify(r))
  return r
}

function hack(kode, nivå, kategori) {
  switch (kode) {
    case 'BS_1':
      return 'Artssammensetning'
    case 'BS_5':
      return 'Menneskeskapte objekter'
    case 'BS_6':
      return 'Regionale komplekse miljøvariable'
    case 'BS_7':
      return 'Tilstandsvariasjon'
    case 'NA_T':
      return 'Fastmarkssystem'
    case 'MI_KA':
      return 'Kalkinnhold'
    default:
      return kategori
    //      return kode + ': ' + nivå + ' - ' + kategori
  }
}

function oppsummer2(node, stack, r) {
  stack = Object.assign({}, stack)
  let v =
    node.andel && node.andel !== 10
      ? 10 * node.andel + '% ' + node.tittel
      : node.tittel
  if (!stack.verdi) stack.verdi = []
  if (!stack.kode) stack.kode = []
  if (node.andel) stack.andel = node.andel
  if (v) stack.verdi.push(v)
  if (node.kode) stack.kode.push(node.kode)
  stack.geom_id = stack.geom_id || node.geom_id
  if (!node.barn) {
    r.push(stack)
    return
  }

  Object.keys(node.barn).forEach(kode => {
    oppsummer2(node.barn[kode], stack, r)
  })
}

class Seksjon extends Component {
  render() {
    const { node, kode, visKoder, kategori } = this.props
    const r = oppsummer(node)
    console.log('listee', JSON.stringify(r))
    const na = kode.startsWith('NA')
    const primary = na
      ? r.map(e => <div>{e.verdi[1]}</div>)
      : r.map(e => this.map(e.verdi))
    return (
      <Listeelement
        key={kode}
        kode={kode}
        secondary={primary}
        primary={hack(kode, r.nivå, kategori)}
        visKoder={visKoder}
      />
    )
  }

  map(r) {
    if (!r[1]) return hack1(r[0])
    return (
      <div>
        {hack1(r[0])}: <b>{hack2(r[1])}</b>
      </div>
    )
  }
}

function hack1(s) {
  switch (s) {
    case 'Bioklimatiske soner':
      return 'Bioklimatisk sone'
    case 'Bioklimatiske seksjoner':
      return 'Bioklimatisk seksjon'
    default:
      return s
  }
}
function hack2(s) {
  switch (s) {
    case '0':
      return 'ingen'
    default:
      return s.replace(' dekning', '')
  }
}

export default Seksjon
