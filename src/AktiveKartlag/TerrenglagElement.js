import React, { Component } from 'react'
import Innstilling from './Innstilling'
import KartlagElement from './Kartlagelement'

class TerrenglagElement extends Component {
  render() {
    return (
      <KartlagElement
        onClick={this.props.onClick}
        erEkspandert={this.props.erEkspandert}
        tittel="Terreng"
        undertittel="2.5x overdrevet"
      >
        <Innstilling />
      </KartlagElement>
    )
  }
}

export default TerrenglagElement
