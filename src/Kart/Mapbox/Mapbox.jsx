import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';

class Mapbox extends Component {
  state = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: 63.459,
      longitude: 10.921,
      zoom: 3.5
    }
  }

  _onViewportChange = viewport =>
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
  })

  onClick = point => {
    alert(point.lngLat)
  }

    render() {
        return <ReactMapGL
        {...this.state.viewport}
        onClick={this.onClick}
        onViewportChange={viewport => this._onViewportChange(viewport)}
        mapboxApiAccessToken="pk.eyJ1IjoiYmpyZXBwZW4iLCJhIjoiY2ltZGFkMW11MDAwdnZpbHVsamhsZzB1dSJ9.oZBI8rZR8YSsXoyIM0vLYg"
        mapStyle="mapbox://styles/bjreppen/cjbxoxrvdeej42smmvf4ibbb0"
        />
    }
}

export default Mapbox;