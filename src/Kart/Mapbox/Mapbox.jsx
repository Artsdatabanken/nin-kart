import React, { Component } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Place from 'material-ui/svg-icons/maps/place'
import { withRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import backend from '../../backend'

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
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize)
    this._resize()

    // const mapInstance = this.map.getMap();
    // mapInstance.on('style.load', function() {
    //     mapInstance.addLayer(Kalk);
    // });

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

  componentWillReceiveProps(nextProps) {
    var currentLocation = nextProps.location.pathname
    let kodematch = currentLocation.match(/\/katalog\/(.*)/)
    if (kodematch && kodematch.length === 2) {
      let kode = kodematch[1]
      if (kode !== this.state.kode) {
        let map = this.map.getMap()
        if (map && map.isStyleLoaded()) {
          if (!map.getLayer(kode)) {
            let filter = {
              id: kode,
              type: 'fill',
              source: 'composite',
              'source-layer': 'naturomrader6',
              interactive: true,
              filter: ['has', kode],
              layout: {},
              paint: {
                'fill-color': 'hsla(251, 59%, 28%, 0.8)',
                'fill-outline-color': 'hsla(251, 59%, 69%, 0.8)',
              },
            }

            let fylkeMatch = kode.match(/GEO_FY-(.*)/)
            if (fylkeMatch && fylkeMatch.length === 2) {
              let fylkeNr = ('0' + fylkeMatch[1]).slice(-2)
              filter = {
                id: kode,
                type: 'fill',
                source: 'composite',
                'source-layer': 'FY',
                filter: ['in', 'FY', '', fylkeNr],
                layout: {},
                paint: {
                  'fill-outline-color': {
                    base: 1,
                    stops: [
                      [0, 'hsla(0, 0%, 0%, 70%)'],
                      [7, 'hsla(0, 0%, 0%, 70%)'],
                      [10, 'hsla(0, 0%, 0%, 0%)'],
                    ],
                  },
                  'fill-color': {
                    base: 1,
                    stops: [
                      [0, 'hsla(0, 0%, 100%, 20%)'],
                      [7, 'hsla(0, 0%, 100%, 20%)'],
                      [10, 'hsla(0, 0%, 0%, 0%)'],
                    ],
                  },
                },
              }
            }

            let kommuneMatch = kode.match(/GEO_KO-(.*)/)
            if (kommuneMatch && kommuneMatch.length === 2) {
              let kommuneNr = ('0' + kommuneMatch[1]).slice(-4)
              filter = {
                id: kode,
                type: 'fill',
                source: 'composite',
                'source-layer': 'KO',
                filter: ['in', 'KO', '', kommuneNr],
                layout: {},
                paint: {
                  'fill-color': 'hsla(0, 0%, 100%, 50%)',
                  'fill-outline-color': 'hsla(0, 0%, 100%, 90%)',
                },
              }
            }

            // eventuelt filter i firebase overstyrer de generelle filterne
            backend.hentKodeMeta(kode).then(data => {
              if (data) {
                if (data.filter) {
                  //            filter = data.filter
                }
              }

              map.addLayer(filter)
              map.removeLayer(this.state.kode)
              this.setState({ kode: kode })
            })
          }
        }
      }
    }
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
    const bounds = this.map.getMap().getBounds()
    this.props.onMapBoundsChange(bounds)
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

  render() {
    const { viewport } = this.state
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
        onViewportChange={viewport => this.handleViewportChange(viewport)}
        mapboxApiAccessToken="pk.eyJ1IjoiYXJ0c2RhdGFiYW5rZW4iLCJhIjoiY2pjNjg2MzVzMHhycjJ3bnM5MHc4MHVzOCJ9.fLnCRyg-hCuTClyim1r-JQ"
        //mapStyle="mapbox://styles/artsdatabanken/cjc68pztl4sud2sp0s4wyy58q"
        mapStyle={this.props.mapStyle}
        minZoom={4}
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

export default withRouter(Mapbox)
