import Mapbox from './Mapbox/Mapbox'
import React, { Component } from 'react'
import { withRouter } from 'react-router'

class Kart extends Component {
  constructor(props) {
    super(props)

    this.isSelected = this.isSelected.bind(this)
    this.handleCheckChange = this.handleCheckChange.bind(this)
  }

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

  isSelected(selectedIds, nodeId) {
    return this.state[selectedIds].indexOf(nodeId) >= 0
  }

  handleCheckChange(event) {
    const value = event.target.checked
    const name = event.target.name
    const filtercode = event.target.alt

    this.updateFilter(value, filtercode, name)
  }

  render() {
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
      />
    )
  }
}

export default withRouter(Kart)
