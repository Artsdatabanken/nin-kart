import Mapbox from './Mapbox/Mapbox'
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Route } from 'react-router-dom'

class Kart extends Component {
  onClick = point => {
    const lngLat = point.lngLat

    const localId =
      point.features &&
      point.features[0] &&
      point.features[0].properties &&
      point.features[0].properties.localId
        ? point.features[0].properties.localId
        : null

    this.props.history.push(`/punkt/${lngLat[0]},${lngLat[1]},${localId}`)
  }

  render() {
    return (
      <Route
        render={() => (
          <Mapbox
            {...this.props}
            onClick={this.onClick}
            onVisibilityChange={this.props.onVisibilityChange}
            onMapBoundsChange={this.props.onMapBoundsChange}
            onColorChange={this.props.onColorChange}
            categories={this.props.categories}
            visibility={this.props.visibility}
            color={this.props.color}
            mapStyle={this.props.mapStyle}
          />
        )}
      />
    )
  }
}

export default withRouter(Kart)
