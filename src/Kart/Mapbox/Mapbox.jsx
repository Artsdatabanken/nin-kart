import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';

class Mapbox extends Component {
    render() {
        return <ReactMapGL
        width={400}
        height={400}
        latitude={37.7577}
        longitude={-122.4376}
        zoom={8}
        onViewportChange={(viewport) => {
          const {width, height, latitude, longitude, zoom} = viewport;
          // Optionally call `setState` and use the state to update the map.
        }}
        mapboxApiAccessToken="pk.eyJ1IjoiYmpyZXBwZW4iLCJhIjoiY2ltZGFkMW11MDAwdnZpbHVsamhsZzB1dSJ9.oZBI8rZR8YSsXoyIM0vLYg"
      />
    }
}

export default Mapbox;