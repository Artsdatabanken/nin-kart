import React, { Component } from 'react'
import NA from './NA'

class SpesifiktObjekt extends Component {
  render() {
    const { prefiks, geom_id } = this.props
    switch (prefiks) {
      case 'NA':
        return <NA geom_id={geom_id} />
      default:
        return <div>bom</div>
    }
  }
}

export default SpesifiktObjekt
