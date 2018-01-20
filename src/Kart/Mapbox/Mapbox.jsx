import React, { Component } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import ControlPanel from './control-panel'
import IconButton from 'material-ui/IconButton'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import './Mapbox.css'

class Mapbox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mapStyle: '',
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        latitude: props.latitude,
        longitude: props.longitude,
        zoom: props.zoom,
      },
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize)
    this._resize()

    // backend.getToken().then(data => {
    //     let parts = data.split('"');
    //     let t = {
    //         value: parts[0],
    //         expires: new Date().getTime() + 60 * 60 * 1000,
    //         when: Date.now()
    //     };
    //     let ndToken = t.value;
    //     const mapInstance = this.map.getMap();
    //     mapInstance.on('load', function() {
    //         mapInstance.addSource('norgeibilder', {
    //             'type': 'raster',
    //             'tiles': ['https://gatekeeper1.geonorge.no/BaatGatekeeper/gk/gk.nib_web_mercator_v2?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&width=256&height=256&styles=default&layers=0&transparent=true&gkt=' + ndToken],
    //             'tileSize': 256,
    //         });
    //         mapInstance.addLayer({
    //             'id':'norgeibilder',
    //             'source': 'norgeibilder',
    //             'type': 'raster',
    //         });
    //     });
    // });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize)
  }
  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: this.props.width || window.innerWidth,
        height: this.props.height || window.innerHeight,
      },
    })
  }

  _onStyleChange = mapStyle => {
    this.setState({ mapStyle })
  }

  _onViewportChange = viewport => this.setState({ viewport })

  onHover = e => {
    // const pos = e.center;
    // const r = this.map.getMap().queryRenderedFeatures([pos.x, pos.y]);
    //  //console.log(point.lngLat)
    // if (r[0]) {
    //     this.map.getMap().setFilter("naturomrader5_hover", ["==", "name", r[0].name]);
    // }
  }

  // onClick = e => {
  //     const pos = e.center;
  //     const r = this.map.getMap().queryRenderedFeatures([pos.x, pos.y]);
  //     if (r[0] && r[0].properties && r[0].properties.localId) {
  //         this.props.onClick(r[0].properties.localId);
  //     }
  // };

  render() {
    const { viewport, mapStyle } = this.state

    return (
      <ReactMapGL
        {...viewport}
        ref={map => {
          this.map = map
        }}
        onClick={this.props.onClick}
        onHover={this.onHover}
        onMouseMove={this.onMouseMove}
        onViewportChange={viewport => this._onViewportChange(viewport)}
        mapboxApiAccessToken="pk.eyJ1IjoiYXJ0c2RhdGFiYW5rZW4iLCJhIjoiY2pjNjg2MzVzMHhycjJ3bnM5MHc4MHVzOCJ9.fLnCRyg-hCuTClyim1r-JQ"
        //mapStyle="mapbox://styles/artsdatabanken/cjc68pztl4sud2sp0s4wyy58q"
        mapStyle={mapStyle}
      >
        <ControlPanel
          containerComponent={this.props.containerComponent}
          onChange={this._onStyleChange}
        />
        <Marker
          latitude={63.4139}
          longitude={10.4064}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <div />
        </Marker>

        <IconButton onClick={this.props.handleToggle}>
          <NavigationMenu />
        </IconButton>
      </ReactMapGL>
    )
  }
}

export default Mapbox
