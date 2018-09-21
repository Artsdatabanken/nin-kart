import React, { Component } from 'react'
import Listeelement from './Listeelement'

function oppsummer(node) {
  let r = []
  if (!node) return r
  if (node.barn)
    Object.keys(node.barn).forEach(kode => {
      let e = []
      let stack = {}
      oppsummer2(node.barn[kode], stack, e)
      r.push(...e)
    })
  else r.push({ verdi: [node.tittel] })

  return r
}

function hack(kode, nivå, kategori) {
  switch (kode) {
    case 'BS_1':
      return 'Artssammensetning'
    case 'BS_2':
      return 'Geologisk sammensetning'
    case 'BS_3':
      return 'Landform'
    case 'BS_4':
      return 'Naturgitte objekter'
    case 'BS_5':
      return 'Menneskeskapte objekter'
    case 'BS_6':
      return 'Regionale komplekse miljøvariable'
    case 'BS_7':
      return 'Tilstandsvariasjon'
    case 'BS_8':
      return 'Terrengformvariasjon'
    case 'BS_9':
      return 'Romlig strukturvariasjon'
    case 'NA_T':
      return 'Fastmarkssystem'
    case 'MI_KA':
      return 'Kalkinnhold'
    default:
      return kategori
    //      return kode + ': ' + nivå + ' - ' + kategori
  }
}

function oppsummer2(node, stack1, r) {
  const stack = Object.assign({}, stack1)
  stack.kode = Object.assign([], stack1.kode)
  stack.verdi = Object.assign([], stack1.verdi)
  if (!stack.verdi) stack.verdi = []
  if (!stack.kode) stack.kode = []
  if (node.tittel) stack.verdi.push(node.tittel)
  if (node.andel && node.andel !== 10) stack.verdi.push(node.andel * 10 + '%')
  if (node.kode) stack.kode.push(node.kode)
  stack.geom_id = stack.geom_id || node.geom_id
  if (node.barn) {
    Object.keys(node.barn).forEach(kode => {
      oppsummer2(node.barn[kode], stack, r)
    })
  } else {
    r.push(stack)
  }
}

class Seksjon extends Component {
  render() {
    const { node, kode, visKoder, kategori, onClick } = this.props
    const r = oppsummer(node)
    const na = kode.startsWith('NA')
    if (na) console.log(r)
    const primary = r.map(e => this.map(e.verdi))
    return (
      <Listeelement
        key={kode}
        kode={kode}
        secondary={primary}
        primary={hack(kode, r.nivå, kategori)}
        visKoder={visKoder}
        onClick={onClick}
      />
    )
  }

  map(r) {
    const len = r.length
    const value = r[len - 1]
    if (len < 2) return hack1(value)
    const key = r[len - 2]

    return (
      <div key={key}>
        {hack1(key.trim())}: <b>{hack2(value)}</b>
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
