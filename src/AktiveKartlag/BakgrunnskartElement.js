import React, { Component } from 'react'
import KartlagElement from './Kartlagelement'

class BakgrunnskartElement extends Component {
  render() {
    return (
      <KartlagElement
        kode="bakgrunnskart"
        tittel="Bakgrunnskart"
        undertittel="Mørk grå"
        farge="#404040"
        kanFlyttes={false}
        {...this.props}
      />
    )
  }
}

export default BakgrunnskartElement
