import React, { Component } from 'react'
import Kodeliste from './Kodeliste'

class Graf extends Component {
  render() {
    return Object.keys(this.props.graf).map(g => (
      <Kodeliste
        onGoToCode={this.props.onGoToCode}
        title={g}
        metadata={this.props.graf[g]}
      />
    ))
  }
}

export default Graf
