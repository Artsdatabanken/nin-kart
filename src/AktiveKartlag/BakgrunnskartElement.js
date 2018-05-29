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
        onToggleVisible={this.props.onToggleVisible}
      />
    )
  }
}

export default BakgrunnskartElement
