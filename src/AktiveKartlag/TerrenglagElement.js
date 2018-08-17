import React, { Component } from 'react'
import KartlagElement from './Kartlagelement'
class TerrenglagElement extends Component {
  undertittel() {
    const vertikaltOverdriv = 2.5
    const konturintervall = 50
    const visKontur = true
    let r = []
    if (vertikaltOverdriv !== 1) r.push(vertikaltOverdriv + 'x overdrevet')
    if (visKontur) r.push('kontur ' + konturintervall + 'm')
    return r.join(', ')
  }

  render() {
    return (
      <KartlagElement
        kode="terreng"
        tittel="Terreng"
        undertittel={this.undertittel()}
        kanFlyttes={false}
        {...this.props}
      />
    )
  }
}

export default TerrenglagElement
