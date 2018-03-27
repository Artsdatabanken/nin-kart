//import Mapbox from './Mapbox'
import Tangram from './LeafletTangram'
import React, { Component } from 'react'
import { withRouter } from 'react-router'

class Kart extends Component {
  onClick = e => {
    console.log(e)
    const latlng = e.leaflet_event.latlng
    this.props.history.push(`/punkt/${latlng.lng},${latlng.lat}`)
  }

  render() {
    return (
      <Tangram
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
    )
    /*
    return (
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
    )
      />*/
  }
}

export default withRouter(Kart)
