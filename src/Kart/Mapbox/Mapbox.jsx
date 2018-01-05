import React, { Component } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import ControlPanel from './control-panel';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import './Mapbox.css'

class Mapbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapStyle: '',
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight,
                latitude: props.latitude,
                longitude: props.longitude,
                zoom: props.zoom
            }
        }
    }

    _onStyleChange = mapStyle => this.setState({mapStyle});

  _onViewportChange = viewport =>
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
  });

   onHover = point => {
        console.log(point.lngLat)
   };

    render() {
        const {viewport, mapStyle} = this.state;

        return (
            <div>

            <ReactMapGL
                {...viewport}
                mapStyle={mapStyle}
                onClick={this.props.onClick}
                onHover={this.onHover}
                onViewportChange={viewport => this._onViewportChange(viewport)}
                //mapboxApiAccessToken="pk.eyJ1IjoiYmpyZXBwZW4iLCJhIjoiY2ltZGFkMW11MDAwdnZpbHVsamhsZzB1dSJ9.oZBI8rZR8YSsXoyIM0vLYg"
                mapboxApiAccessToken="pk.eyJ1IjoiYW11bmRuIiwiYSI6ImNqYnhweHFjMTJxczczMnBwN3Jmaml2c2wifQ.oPYPvVXUxTztCvw0E2QZ9A"
                //mapStyle="mapbox://styles/bjreppen/cjbxoxrvdeej42smmvf4ibbb0"
                //mapStyle="mapbox://styles/amundn/cjbxq1m6redp82sqzgt72edqf"
              >
                <ControlPanel
                    containerComponent={this.props.containerComponent}
                    onChange={this._onStyleChange} />

                <Marker latitude={63.4139} longitude={10.4064} offsetLeft={-20} offsetTop={-10}>
                    <div>Are you here?</div>
                </Marker>

                <IconButton
                    onClick={this.props.handleToggle}>
                    <NavigationMenu />
                </IconButton>
            </ReactMapGL>

            </div>
        );
    }
}

export default Mapbox;