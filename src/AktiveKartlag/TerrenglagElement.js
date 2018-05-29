import React, { Component } from 'react'
import KartlagElement from './Kartlagelement'
class TerrenglagElement extends Component {
  render() {
    return (
      <KartlagElement
        kode="terreng"
        tittel="Terreng"
        undertittel="2.5x overdrevet"
      />
    )
  }
}

export default TerrenglagElement
