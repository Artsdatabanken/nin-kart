import React, { Component } from 'react'
import KartlagElement from './Kartlagelement'

class BakgrunnskartElement extends Component {
  render() {
    return (
      <KartlagElement
        kode="bakgrunnskart"
        tittel="Bakgrunnskart"
        undertittel={this.props.tema}
        {...this.props}
      />
    )
  }
}

export default BakgrunnskartElement
