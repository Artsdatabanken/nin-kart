import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';

class Mapbox extends Component {
    render() {
        const {latitude, longitude, zoom} = this.props
        return <ReactMapGL
        width={window.innerWidth}
        height={window.innerHeight}
        latitude={latitude}
        longitude={longitude}
        zoom={zoom}
        onViewportChange={(viewport) => {
          const {width, height, latitude, longitude, zoom} = viewport;
          // Optionally call `setState` and use the state to update the map.
        }}
        mapboxApiAccessToken="pk.eyJ1IjoiYmpyZXBwZW4iLCJhIjoiY2ltZGFkMW11MDAwdnZpbHVsamhsZzB1dSJ9.oZBI8rZR8YSsXoyIM0vLYg"
      />
    }
}

export default Mapbox;