import React, { Component } from 'react'
import ReactMapGL, { Marker, Popup, NavigationControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Place from 'material-ui/svg-icons/maps/place'
import { withRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import muiThemeable from 'material-ui/styles/muiThemeable'
import hentLag from './style-lookup'
import backend from '../../backend'
import DeckGL, { GridLayer /*, ScatterplotLayer */ } from 'deck.gl'
import Color from 'color'
import localStorageHelper from '../../localStorageHelper'

const LIGHT_SETTINGS = {
  lightsPosition: [9.5, 56, 5000, -2, 57, 8000],
  ambientRatio: 0.2,
  diffuseRatio: 0.5,
  specularRatio: 0.3,
  lightsStrength: [1.0, 0.0, 2.0, 0.0],
  numberOfLights: 2,
}

const navStyle = {
  position: 'absolute',
  bottom: 30,
  right: 0,
  padding: '10px',
}

class Mapbox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      utbredelsesData: [],
      enableDeck: false,
      popup: {
        lat: 61.8,
        lon: 9.8,
        message: '',
      },
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        latitude: props.latitude,
        longitude: props.longitude,
        zoom: props.zoom,
        pitch: props.pitch,
        bearing: props.bearing,
      },
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize)
    this._resize()
    this.updateAktivKode(
      this.props.aktivKode,
      this.props.meta ? this.props.meta.navnSciId : ''
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.opplystKode !== this.props.opplystKode) {
      this.updateOpplystKode(
        nextProps.aktivKode,
        nextProps.opplystKode.toUpperCase()
      )
    }

    if (nextProps.aktivKode !== this.props.aktivKode) {
      this.updateAktivKode(nextProps.aktivKode, nextProps.meta.navnSciId)
      this.fargeleggLag(nextProps)
    }

    if (nextProps.oppdaterFarger === null) {
      if (nextProps.oppdaterFarger !== this.props.oppdaterFarger) {
        this.fargeleggLag(nextProps)
        this.oppdaterValgteKoder(nextProps)
      }
    }

    if (nextProps.valgteKoder !== this.props.valgteKoder) {
      this.visValgteKoder(nextProps)
    }
    if (nextProps.fjernKode !== this.props.fjernKode) {
      this.fjernKode(nextProps.fjernKode)
    }

    if (nextProps.bbox && nextProps.bbox !== this.props.bbox) {
      this.fitBounds(nextProps.bbox)
    }
  }

  updateAktivKode(aktivKode, navnSciId) {
    let map = this.map.getMap()

    if (aktivKode) {
      let taxonMatch = aktivKode.match(/AR_(.*)/)
      if (taxonMatch && taxonMatch.length > 1 && navnSciId) {
        backend.getKodeUtbredelse('TX_' + navnSciId).then(data => {
          this.setState({
            enableDeck: data ? true : false,
            taxonLayer: data ? this.createTaxonLayer(data) : null,
          })
        })
      }
    }

    if (!map || !map.isStyleLoaded()) {
      console.log(
        'kode: ' +
          aktivKode +
          ' mapstyle loaded: ' +
          (map ? map.isStyleLoaded() : false)
      )
      return
    }
    map.removeLayer('aktivt')
    map.removeLayer('opplyst') // fjern opplyst/hover-lag også når man endrer aktivt
    //console.log('fjernet aktivt')

    if (aktivKode) {
      let taxonMatch = aktivKode.match(/AR\/(.*)/)
      if (this.state.enableDeck !== taxonMatch) {
        this.setState({ enableDeck: taxonMatch })
      }
      let aktivtLag = hentLag(map, aktivKode)
      if (aktivtLag) {
        aktivtLag.id = 'aktivt'

        aktivtLag.paint['fill-outline-color'] = Color('#ffffff').rgbaString()
        let customColor = localStorageHelper.getFargeKode(
          aktivKode,
          this.props.meta
        )
        let fillColor = customColor
          ? Color(customColor)
          : Color('#ff2222').alpha(0.7)
        aktivtLag.paint['fill-color'] = fillColor.rgbaString()

        //console.log('add aktivt: ', aktivKode)
        this.addBehindSymbols(map, aktivtLag)
      }
    }
  }

  updateOpplystKode = backend.debounce(function(aktivKode, opplystKode) {
    let map = this.map.getMap()
    if (!map || !map.isStyleLoaded()) return
    map.removeLayer('opplyst')
    //console.log('fjernet opplyst')

    if (opplystKode) {
      if (
        this.props.meta &&
        this.props.meta.barn &&
        this.props.meta.barn[opplystKode]
      ) {
        let opplystLag = hentLag(map, opplystKode)
        if (!opplystLag || !opplystLag.paint) return

        opplystLag.paint['fill-color'] = 'cyan'
        opplystLag.paint['fill-outline-color'] = 'cyan'
        opplystLag.id = 'opplyst'
        //console.log('add opplyst: ', opplystKode)
        this.addBehindSymbols(map, opplystLag)
      }
    }
  }, 100)

  addBehindSymbols(map, lag) {
    var layers = map.getStyle().layers
    // Find the index of the first symbol layer in the map style
    var firstSymbolId
    for (var i = 0; i < layers.length; i++) {
      if (layers[i].type === 'symbol') {
        firstSymbolId = layers[i].id
        break
      }
    }

    map.addLayer(lag, firstSymbolId)
  }

  fargeleggLag(nextProps) {
    let map = this.map.getMap()
    if (!map) return

    if (this.props.meta && this.props.meta.barn) {
      Object.keys(this.props.meta.barn).forEach(kode => {
        map.removeLayer('legend' + kode)
        console.log('fjernet ' + kode)
      })
    }

    var addLayers = () => {
      if (map.isStyleLoaded()) {
        if (
          nextProps.meta &&
          nextProps.meta.barn &&
          nextProps.meta.kode !== '~'
        ) {
          Object.keys(nextProps.meta.barn).forEach(kode => {
            const barn = nextProps.meta.barn[kode]
            let lag = hentLag(map, kode)
            if (!lag || !lag.paint) return
            if (!lag.custom) {
              let customColor = localStorageHelper.getFargeKode(
                kode,
                barn || nextProps.meta
              )

              let fillColor = customColor
                ? Color(customColor)
                : Color(barn.farge || '#ff2222').alpha(0.7)
              lag.paint['fill-color'] = fillColor.rgbaString()
              lag.paint['fill-outline-color'] = Color('#ffffff').rgbaString()
            }
            lag.id = 'legend' + kode
            console.log('add lag: ', kode)
            this.addBehindSymbols(map, lag)
          })
        }
        map.off('styledata', addLayers)
      }
      // else {
      //   console.log('Fortsatt ikke klar...')
      // }
    }

    map.on('styledata', addLayers)
  }

  fjernKode(kode) {
    let map = this.map.getMap()
    if (!map) return
    map.removeLayer(kode)
  }

  oppdaterValgteKoder(nextProps) {
    let map = this.map.getMap()
    if (!map) return

    if (nextProps.valgteKoder) {
      Object.keys(nextProps.valgteKoder).forEach(id => {
        const item = nextProps.valgteKoder[id]
        let lagId = 'valgt' + item.kode
        if (map.getLayer(lagId)) {
          map.removeLayer(lagId)
        }
      })
      this.visValgteKoder(nextProps)
    }
  }

  visValgteKoder(nextProps) {
    let map = this.map.getMap()
    if (!map) return

    if (nextProps.valgteKoder) {
      Object.keys(nextProps.valgteKoder).forEach(id => {
        const item = nextProps.valgteKoder[id]
        let lagId = 'valgt' + item.kode
        if (!map.getLayer(lagId)) {
          let lag = hentLag(map, item.kode)
          if (!lag || !lag.paint) return
          if (!lag.custom) {
            let customColor = localStorageHelper.getFargeKode(
              item.kode,
              item || nextProps.meta
            )

            let fillColor = customColor
              ? Color(customColor)
              : Color(item.farge || '#ff2222').alpha(0.7)
            lag.paint['fill-color'] = fillColor.rgbaString()
            lag.paint['fill-outline-color'] = Color('#ffffff').rgbaString()
          }
          lag.id = lagId
          console.log('la til valgt lag: ', item.kode)
          this.addBehindSymbols(map, lag)
        }
      })
    }
  }

  fitBounds(bbox) {
    let map = this.map.getMap()
    if (map && bbox) {
      //const bounds = [[bbox[2], bbox[3]], [bbox[0], bbox[1]]]
      map.once('moveend', () =>
        this.handleViewportChange({
          ...this.state.viewport,
          latitude: map.getCenter().lat,
          longitude: map.getCenter().lng,
          zoom: map.getZoom(),
          pitch: map.getPitch(),
          bearing: map.getBearing(),
        })
      )
      map.fitBounds(bbox, {
        padding: { top: 10, bottom: 25, left: 400, right: 5 },
      })
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
    // Bruk bare bounds dersom zoomnivå > 8
    var bounds = undefined
    if (viewport.zoom > 8) {
      bounds = this.map.getMap().getBounds()
    }
    this.props.onMapBoundsChange(bounds)
  }

  onHover = backend.debounce(function(e) {
    const pos = e.center
    const r = this.map.getMap().queryRenderedFeatures([pos.x, pos.y])
    this.map.getMap().setFilter('nin-hover', ['==', 'localId', ''])
    r.forEach(feature => {
      if (feature.layer.id === 'nin') {
        if (feature.properties && feature.properties.localId) {
          this.map
            .getMap()
            .setFilter('nin-hover', [
              '==',
              'localId',
              feature.properties.localId,
            ])
          console.log('Filter set to ' + feature.properties.localId)
          return
        }
      }
    })
  }, 50)

  onTaxonHover = backend.debounce(function(data) {
    if (data && data.object && data.object.elevationValue) {
      this.setState({
        popup: {
          lon: data.object.position[0],
          lat: data.object.position[1],
          message: 'Antall: ' + data.object.elevationValue,
        },
      })
    } else {
      this.setState({
        popup: {
          message: '',
        },
      })
    }
    //console.log('Antall: ' + data.object.elevationValue)
  }, 50)

  createTaxonLayer(data) {
    return new GridLayer({
      id: 'taxonLayer',
      data: data,
      //cellSize: 4000,
      elevationScale: 50,
      //colorDomain: [0, 200],
      //colorRange: [['#edf8fb'],['#bfd3e6'],['#9ebcda'],['#8c96c6'],['#8856a7'],['#810f7c']],
      extruded: true,
      lightSettings: LIGHT_SETTINGS,
      getPosition: function(e) {
        return [e[0], e[1]]
      },
      getElevationValue: function(points) {
        var count = 0
        points.forEach(i => (count += i[2]))
        return count
      },
      getColorValue: function(points) {
        var count = 0
        points.forEach(i => (count += i[2]))
        return count
      },
      pickable: true,
      onHover: data => {
        this.onTaxonHover(data)
      },
    })
  }

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
        onHover={e => this.onHover(e)}
        onMouseMove={this.onMouseMove}
        onViewportChange={viewport => this.handleViewportChange(viewport)}
        mapboxApiAccessToken="pk.eyJ1IjoiYXJ0c2RhdGFiYW5rZW4iLCJhIjoiY2pjNjg2MzVzMHhycjJ3bnM5MHc4MHVzOCJ9.fLnCRyg-hCuTClyim1r-JQ"
        //mapStyle="mapbox://styles/artsdatabanken/cjc68pztl4sud2sp0s4wyy58q"
        mapStyle={this.props.mapStyle}
        minZoom={4}
      >
        {this.state.enableDeck && (
          <DeckGL {...viewport} layers={[this.state.taxonLayer]} />
        )}
        {this.state.popup.message && (
          <Popup
            latitude={this.state.popup.lat}
            longitude={this.state.popup.lon}
            closeButton={false}
            closeOnClick={false}
            anchor="top"
          >
            <div>{this.state.popup.message}</div>
          </Popup>
        )}
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
        <div className="nav" style={navStyle}>
          <NavigationControl
            onViewportChange={viewport => this.handleViewportChange(viewport)}
          />
        </div>
      </ReactMapGL>
    )
  }
}

export default muiThemeable()(withRouter(Mapbox))
