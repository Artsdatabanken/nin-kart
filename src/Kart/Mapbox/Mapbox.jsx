import React, { Component } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Place from 'material-ui/svg-icons/maps/place'
import { withRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import muiThemeable from 'material-ui/styles/muiThemeable'
import hentLag from './style-lookup'
import MapboxPanHandler from './MapboxPanHandler'

class Mapbox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        latitude: props.latitude,
        longitude: props.longitude,
        zoom: props.zoom,
      },
    }
    this.onPanEnd = this.onPanEnd.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize)
    this._resize()
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.opplystKode !== this.props.opplystKode ||
      nextProps.aktivKode !== this.props.aktivKode
    )
      this.handleStyleUpdate(nextProps.aktivKode, nextProps.opplystKode)
  }

  handleStyleUpdate(kode, opplystKode) {
    let map = this.map.getMap()
    if (!map || !map.isStyleLoaded()) return

    // try {
    map.removeLayer(this.props.aktivKode)
    if (kode) {
      let lag = hentLag(map, kode)
      if (lag) map.addLayer(lag)
    }

    console.log('rmv opplyst')
    map.removeLayer('opplyst')
    if (opplystKode) {
      let opplystLag = hentLag(map, opplystKode)
      if (!opplystLag || !opplystLag.paint) return
      opplystLag.paint['fill-color'] = 'rgba(255,255,255,50%)'
      opplystLag.paint['fill-outline-color'] = 'rgba(255,255,255,80%)'
      opplystLag.id = 'opplyst'
      console.log('add', opplystKode)
      map.addLayer(opplystLag)
    }
    //    } catch (error) {
    //     console.log(error) // TODO: Make it not fail on Sør- og Nord-trøndelag
    //  }
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

  handleViewportChange = viewport => {
    this.setState({ viewport })
  }

  onHover = e => {
    const pos = e.center
    const r = this.map.getMap().queryRenderedFeatures([pos.x, pos.y])
    if (r[0]) {
      //console.log(r[0].properties.localId);
      this.map
        .getMap()
        .setFilter('nin-hover', ['==', 'localId', r[0].properties.localId])
    }
  }

  // onClick = e => {
  //     const pos = e.center;
  //     const r = this.map.getMap().queryRenderedFeatures([pos.x, pos.y]);
  //     if (r[0] && r[0].properties && r[0].properties.localId) {
  //         this.props.onClick(r[0].properties.localId);
  //     }
  // };

  onPanEnd = e => {
    // TODO: We should update bounds also after zoom
    var bounds = this.map.getMap().getBounds()
    this.props.onMapBoundsChange(bounds)
    this.updateBounds = true
  }

  render() {
    const { viewport } = this.state
    const mapControls = new MapboxPanHandler({ onPanEnd: this.onPanEnd })
    return (
      <ReactMapGL
        {...viewport}
        ref={map => {
          this.map = map
        }}
        style={{ cursor: 'default' }}
        onClick={this.props.onClick}
        onHover={this.onHover}
        onMouseMove={this.onMouseMove}
        onLoad={() =>
          this.handleStyleUpdate(this.props.aktivKode, this.props.opplystKode)
        }
        onViewportChange={viewport => this.handleViewportChange(viewport)}
        mapboxApiAccessToken="pk.eyJ1IjoiYXJ0c2RhdGFiYW5rZW4iLCJhIjoiY2pjNjg2MzVzMHhycjJ3bnM5MHc4MHVzOCJ9.fLnCRyg-hCuTClyim1r-JQ"
        //mapStyle="mapbox://styles/artsdatabanken/cjc68pztl4sud2sp0s4wyy58q"
        mapStyle={this.props.mapStyle}
        minZoom={4}
        mapControls={mapControls}
      >
        <Switch>
          <Route
            path="/punkt/:lng,:lat"
            render={({ match, history }) => (
              <Marker
                latitude={parseFloat(match.params.lat)}
                longitude={parseFloat(match.params.lng)}
                offsetLeft={-12}
                offsetTop={-24}
              >
                <Place style={{ color: '#fff' }} />
              </Marker>
            )}
          />
        </Switch>
      </ReactMapGL>
    )
  }
}

export default muiThemeable()(withRouter(Mapbox))
