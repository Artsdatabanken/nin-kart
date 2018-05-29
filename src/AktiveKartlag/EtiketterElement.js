import React, { Component } from 'react'
import KartlagElement from './Kartlagelement'

class EtiketterElement extends Component {
  render() {
    return (
      <KartlagElement
        kode="etikett"
        tittel="Etiketter"
        undertittel="Verneområder, stedsnavn"
        onToggleVisible={this.props.onToggleVisible}
      />
    )
  }
}

export default EtiketterElement
