import Mapbox from './Mapbox/Mapbox'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
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
    this.props.history.push(`/punkt/${lngLat[0]},${lngLat[1]}`)
    /*
    const localId =
      (point.features &&
      point.features[0] &&
      point.features[0].properties &&
      point.features[0].properties.localId) || null
      this.setState({localId: localId})
    */
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
      <MuiThemeProvider>
        <Mapbox
          {...this.props}
          onClick={this.onClick}
          onVisibilityChange={this.props.onVisibilityChange}
          onColorChange={this.props.onColorChange}
          categories={this.props.categories}
          visibility={this.props.visibility}
          color={this.props.color}
          mapStyle={this.props.mapStyle}
        />
      </MuiThemeProvider>
    )
  }
}

export default withRouter(Kart)
