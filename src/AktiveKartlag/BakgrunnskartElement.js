import React, { Component } from 'react'
import KartlagElement from './Kartlagelement'

class BakgrunnskartElement extends Component {
  render() {
    return (
      <KartlagElement
        kode="bakgrunnskart"
        tittel="Bakgrunnskart"
        undertittel="Mørk grå"
        {...this.props}
      />
    )
  }
}

export default BakgrunnskartElement
