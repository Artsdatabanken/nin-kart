import React, { Component } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';

class Mapbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight,
                latitude: props.latitude,
                longitude: props.longitude,
                zoom: props.zoom
            }
        }
    }

  _onViewportChange = viewport =>
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
  })

  onClick = point => {
    alert(point.lngLat)
  }

   onHover = point => {
        console.log(point.lngLat)
   }

    render() {
        return <ReactMapGL
        {...this.state.viewport}
        onClick={this.onClick}
        onHover={this.onHover}
        onViewportChange={viewport => this._onViewportChange(viewport)}
        mapboxApiAccessToken="pk.eyJ1IjoiYmpyZXBwZW4iLCJhIjoiY2ltZGFkMW11MDAwdnZpbHVsamhsZzB1dSJ9.oZBI8rZR8YSsXoyIM0vLYg"
      >
            <Marker latitude={63.4139} longitude={10.4064} offsetLeft={-20} offsetTop={-10}>
                <div>Are you here?</div>
            </Marker>
        </ReactMapGL>
    }
}

export default Mapbox;