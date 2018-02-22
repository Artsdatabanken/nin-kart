import React, { Component } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Place from 'material-ui/svg-icons/maps/place'
import { withRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import muiThemeable from 'material-ui/styles/muiThemeable'
import hentLag from './style-lookup'
import backend from '../../backend'
import DeckGL, { GridLayer } from 'deck.gl'
import Color from 'color'

const LIGHT_SETTINGS = {
  lightsPosition: [9.5, 56, 5000, -2, 57, 8000],
  ambientRatio: 0.2,
  diffuseRatio: 0.5,
  specularRatio: 0.3,
  lightsStrength: [1.0, 0.0, 2.0, 0.0],
  numberOfLights: 2,
}
const colorScale = r => [r * 255, 140, 200 * (1 - r)]

class Mapbox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      utbredelsesData: [],
      showTaxonGrid: false,
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
    this.tempHackFetchMeta(this.props.aktivKode)
  }

  componentDidUpdate() {
    this.updateAktivKode(this.props.aktivKode, this.props.opplystKode)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.opplystKode !== this.props.opplystKode) {
      this.updateAktivKode(nextProps.aktivKode, nextProps.opplystKode)
    }

    if (nextProps.aktivKode !== this.props.aktivKode) {
      this.updateAktivKode(nextProps.aktivKode, nextProps.opplystKode)
      this.tempHackFetchMeta(nextProps.aktivKode)
    }
  }

  updateAktivKode(kode, opplystKode) {
    kode = kode || 'ROT'
    let map = this.map.getMap()
    if (kode && kode !== this.props.aktivKode) {
      let taxonMatch = kode.match(/TX_(.*)/)
      if (taxonMatch) {
        backend.getKodeUtbredelse(kode).then(data => {
          this.setState({ utbredelsesData: data })
        })
      }
      backend.getKodeBBox(kode).then(data => {
        if (map && data) {
          map.fitBounds([[data[2], data[3]], [data[0], data[1]]], {
            padding: { top: 10, bottom: 25, left: 15, right: 5 },
          })
        }
      })
    }

    if (!map || !map.isStyleLoaded()) {
      console.log(
        'kode: ' +
          kode +
          ' mapstyle loaded: ' +
          (map ? map.isStyleLoaded() : false)
      )
      return
    }

    map.removeLayer(this.props.aktivKode)
    let taxonMatch = kode.match(/TX_(.*)/)
    if (this.state.enableDeck !== taxonMatch)
      this.setState({ enableDeck: taxonMatch })
    if (taxonMatch) {
      let url = backend.getKodeUtbredelseUrl(kode)

      let kilde = {
        type: 'image',
        url: url,
        coordinates: [
          [-2.12900722, 71.87414651],
          [32.7256258, 71.87414651],
          [32.7256258, 57.36940657],
          [-2.12900722, 57.36940657],
        ],
      }

      map.removeSource('tx_overlay') // remove if it exist
      map.addSource('tx_overlay', kilde)

      let lag = hentLag(map, kode)
      if (lag) map.addLayer(lag)
    }

    if (this.state.meta) {
      map.removeLayer('n50-ld-1')
      map.removeLayer('n50-ld-2')
      map.removeLayer('ar50-ld-12')
      map.removeLayer('nin')
      map.removeLayer('ar50-snoisbre')
      map.removeLayer('ar50-snoisbre_EN')
      map.removeLayer('nin-hover')
      map.removeLayer('naturomrader6')
      map.removeLayer('naturomrader6-hover')
      map.removeLayer('Rodlistede')
      //      console.log(map.getStyle().layers)
      if (this.state.meta.barn) {
        Object.keys(this.state.meta.barn).forEach(kode => {
          const barn = this.state.meta.barn[kode]
          map.removeLayer(kode)
          let lag = hentLag(map, kode)
          if (lag && lag.type === 'fill') {
            let fillColor = Color(barn.farge).alpha(0.35)
            const isHighlighted = kode === opplystKode
            if (isHighlighted) {
              fillColor = fillColor.lightness(90).saturate(90)
              //            fillColor = Color('#ff8000')
            }
            //            .saturate(4.0)
            lag.paint['fill-color'] = fillColor.rgbaString()
            const outlineColor = isHighlighted
              ? fillColor.darken(0.5)
              : fillColor.darken(0.9)
            lag.paint['fill-outline-color'] = outlineColor.rgbaString()
            map.addLayer(lag, 'building')
          }
        })
      }
      //      console.log(map.getStyle().layers)
    } else if (kode) {
      let lag = hentLag(map, kode)
      if (lag) map.addLayer(lag)
    }
  }

  queryNumber = 0
  tempHackFetchMeta(kode) {
    this.queryNumber++
    const currentQuery = this.queryNumber
    backend.hentKodeMeta(kode).then(data => {
      if (currentQuery !== this.queryNumber) return // Abort stale query
      this.setState({ meta: data })
    })
  }

  handleStyleUpdate(kode, opplystKode) {
    //this.updateAktivKode(kode, opplystKode)
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
    /*
    const pos = e.center
    const r = this.map.getMap().queryRenderedFeatures([pos.x, pos.y])
    // TODO:
    if (r[0]) {
      //console.log(r[0].properties.localId);
      this.map
        .getMap()
        .setFilter('nin-hover', ['==', 'localId', r[0].properties.localId])
    }
    */
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

    const taxonLayer = new GridLayer({
      id: 'taxonLayer',
      data: this.state.utbredelsesData,
      cellSize: 500000 * (1 / (viewport.zoom * viewport.zoom * viewport.zoom)),
      elevationScale: 20,
      extruded: true,
      lightSettings: LIGHT_SETTINGS,
      getPosition: function(e) {
        return e.g
      },
      getElevationValue: function(points) {
        var count = 0
        points.forEach(i => (count += i.n))
        return count
      },
    })

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
      >
        {this.state.showTaxonGrid && (
          <DeckGL {...viewport} layers={[taxonLayer]} colorScale={colorScale} />
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
      </ReactMapGL>
    )
  }
}

export default muiThemeable()(withRouter(Mapbox))
