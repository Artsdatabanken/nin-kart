import React, { Component } from 'react'
import KartlagElement from './Kartlagelement'

class BakgrunnskartElement extends Component {
  render() {
    return (
      <KartlagElement
        tittel="Bakgrunnskart"
        undertittel="Mørk grå"
        farge="#404040"
      >
        abc
      </KartlagElement>
    )
  }
}

export default BakgrunnskartElement
