import React, { Component } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Place from 'material-ui/svg-icons/maps/place'
import { withRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import muiThemeable from 'material-ui/styles/muiThemeable'
import hentLag from './style-lookup'
import backend from '../../backend'
import DeckGL, { GridLayer /*, ScatterplotLayer */ } from 'deck.gl'
import Color from 'color'
import 'mapbox-gl/dist/mapbox-gl.css'

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
      enableDeck: false,
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

  getFargeKode = kode => {
    let customColors = localStorage.getItem('customColors')
    if (customColors) {
      let fargeElement = JSON.parse(customColors).filter(x => x.kode === kode)
      return fargeElement && fargeElement[0] && fargeElement[0].farge
        ? fargeElement[0].farge
        : this.props.meta.farge
    }
    return this.props.meta.farge
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
      this.updateOpplystKode(nextProps.aktivKode, nextProps.opplystKode)
    }

    if (nextProps.aktivKode !== this.props.aktivKode) {
      this.updateAktivKode(nextProps.aktivKode, nextProps.meta.navnSciId)
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
            utbredelsesData: data ? data : [],
            enableDeck: data ? true : false,
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

    if (aktivKode) {
      let taxonMatch = aktivKode.match(/AR\/(.*)/)
      if (this.state.enableDeck !== taxonMatch) {
        this.setState({ enableDeck: taxonMatch })
      }
      let aktivtLag = hentLag(map, aktivKode)
      if (aktivtLag) {
        aktivtLag.id = 'aktivt'
        //aktivtLag.paint['fill-pattern'] = 'shovel'

        let customColor = this.getFargeKode(aktivKode)
        let fillColor = customColor
          ? Color(customColor)
          : Color(this.props.meta.farge || '#ffff00')
        aktivtLag.paint['fill-color'] = fillColor.rgbaString()

        console.log('add aktivt: ', aktivKode)
        map.addLayer(aktivtLag)
      }
    }
  }

  updateOpplystKode(aktivKode, opplystKode) {
    let map = this.map.getMap()
    if (!map || !map.isStyleLoaded()) return
    if (opplystKode) {
      if (
        this.props.meta &&
        this.props.meta.barn &&
        this.props.meta.barn[opplystKode]
      ) {
        const barn = this.props.meta.barn[opplystKode]
        let opplystLag = hentLag(map, opplystKode)
        if (!opplystLag || !opplystLag.paint) return
        let customColor = this.getFargeKode(opplystKode)
        let fillColor = customColor
          ? Color(customColor)
          : Color(barn.farge || '#ffff00')
        // .alpha(0.35)
        // .lightness(90)
        // .saturate(90)
        opplystLag.paint['fill-color'] = fillColor.rgbaString()
        const outlineColor = fillColor.darken(0.5)
        opplystLag.paint['fill-outline-color'] = outlineColor.rgbaString()
        opplystLag.id = 'opplyst'
        console.log('add opplyst: ', opplystKode)
        map.addLayer(opplystLag)
      }
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
    //console.log(viewport);
    this.setState({ viewport })
    // Bruk bare bounds dersom zoomnivå > 8
    const bounds = this.map.getMap().getBounds()
    this.props.onMapBoundsChange(viewport.zoom > 8 ? bounds : undefined)
  }

  onHover = e => {
    const pos = e.center
    const r = this.map.getMap().queryRenderedFeatures([pos.x, pos.y])
    // TODO:
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

    const taxonLayer = new GridLayer({
      id: 'taxonLayer',
      data: this.state.utbredelsesData,
      cellSize: 4000,
      elevationScale: 20,
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
    })

    // Test scatterplotlayer
    // const taxonLayer = new ScatterplotLayer({
    //   id: 'taxonLayer',
    //   data: this.state.utbredelsesData,
    //     radiusScale: 30,
    //     radiusMinPixels: 0.25,
    //     getPosition: d => [d.g[0], d.g[1], 0],
    //     getColor: d => ([255, 0, 128]),
    //     getRadius: d => 1
    // })

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
        {this.state.enableDeck && (
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
