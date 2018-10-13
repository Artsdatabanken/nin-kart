import React, { Component } from 'react'
import KartlagElement from './Kartlagelement'

class BakgrunnskartElement extends Component {
  render() {
    console.log('props', this.props)
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
