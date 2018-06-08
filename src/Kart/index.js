import React, { Component } from 'react'
import { withRouter } from 'react-router'
import Mapbox from './Mapbox'

class Kart extends Component {
  handleClick = point => {
    const lngLat = point.lngLat
    var found = false
    if (point.features) {
      point.features.forEach(feature => {
        if (feature.properties && feature.properties.localId) {
          this.props.setLocalId(feature.properties.localId)
          found = true
        }
      })
    }
    if (!found) {
      this.props.setLocalId('')
    }

    this.props.history.push(`/punkt/${lngLat[0]},${lngLat[1]}`)
  }

  render() {
    return (
      <Mapbox
        {...this.props}
        onClick={this.handleClick}
        onVisibilityChange={this.props.onVisibilityChange}
        onMapBoundsChange={this.props.onMapBoundsChange}
        categories={this.props.categories}
        visibility={this.props.visibility}
        mapStyle={this.props.mapStyle}
      />
    )
  }
}

export default withRouter(Kart)
