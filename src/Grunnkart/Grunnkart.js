import React, { Component } from 'react'
import MainDrawer from './MainDrawer'
import { FloatingActionButton } from 'material-ui'
import KatalogIkon from 'material-ui/svg-icons/communication/import-contacts'
import { Link } from 'react-router-dom'
import {
  defaultMapStyle,
  darkMapStyle,
  vintageMapStyle,
  satelliteStyle,
  NiN,
} from '../Kart/Mapbox/MapStyle'
import { withRouter } from 'react-router'
import VenstreVinduContainer from '../VenstreVinduContainer'
import Kart from '../Kart/Kart'
import backend from '../backend'

class Grunnkart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      language: ['nb', 'la'],
      baseMapStyle: defaultMapStyle,
      mapStyle: '',
      showMainDrawer: false,
      pointProperties: null,
    }

    this.handleChangeBaseMap = this.handleChangeBaseMap.bind(this)
    this.handleUpdateLayerProp = this.handleUpdateLayerProp.bind(this)
  }

  handleChangeBaseMap(type) {
    let newStyle = defaultMapStyle
    switch (type) {
      case 'dark': {
        newStyle = darkMapStyle
        break
      }
      case 'vintage': {
        newStyle = vintageMapStyle
        break
      }
      case 'satellite': {
        newStyle = satelliteStyle
        break
      }
      default: {
        break
      }
    }
    this.setState(
      {
        baseMapStyle: newStyle,
      },
      () => {
        this.addCustomLayers()
      }
    )
  }

  addCustomLayers() {
    const layers = this.state.baseMapStyle.get('layers').push(NiN)
    this.setState({
      mapStyle: this.state.baseMapStyle.set('layers', layers),
    })
  }

  debounce(func, wait, immediate) {
    var timeout
    return function() {
      var context = this,
        args = arguments
      var later = function() {
        timeout = null
        if (!immediate) func.apply(context, args)
      }
      var callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func.apply(context, args)
    }
  }

  setMapBounds = this.debounce(function(bounds) {
    this.setState({ mapbounds: bounds })
  }, 50)

  setBBox = this.debounce(function(bbox) {
    this.setState({ bbox: bbox })
  }, 50)

  setLocalId(localId) {
    this.setState({ localId: localId })
  }

  componentDidMount() {
    this.handleChangeBaseMap()
    this.fetchMeta(this.props.location.pathname)
  }

  componentWillReceiveProps(nextProps, props) {
    if (nextProps.location.pathname !== this.props.location.pathname)
      this.fetchMeta(nextProps.location.pathname)
  }
  static tempCounter = 0
  static tempColors = [
    '#d53e4f',
    '#f46d43',
    '#fdae61',
    '#fee08b',
    '#e6f598',
    '#abdda4',
    '#66c2a5',
    '#3288bd',
  ]

  redirectTo(path) {
    const newUrl = '/katalog/' + path
    console.log('router videre til ', newUrl)
    this.props.history.push(newUrl)
  }

  fetchMeta(url) {
    url = url.toLowerCase()
    backend.hentKodeMeta(url).then(data => {
      if (!data) return this.redirectTo('')
      if (data.se) {
        const newUrl = data.se[Object.keys(data.se)[0]].url
        this.redirectTo(newUrl)
        return
      }
      if (data && data.barn)
        Object.keys(data.barn).forEach(key => {
          let v = data.barn[key]
          if (!v.farge) {
            const i = Grunnkart.tempCounter++ % Grunnkart.tempColors.length
            v.farge = Grunnkart.tempColors[i]
          }
        })
      this.setState({ meta: data ? data : '' })
    })
  }
  handleUpdateLayerProp = (kode, key, value) => {
    let meta = this.state.meta
    let layer = meta.barn[kode]
    layer[key] = value
    this.setState({ meta: meta })
  }

  render() {
    if (!(this.state.meta && this.state.meta.kode)) return null
    return (
      <div>
        <Kart
          latitude={65.4}
          longitude={10.8}
          zoom={4.1}
          pitch={0}
          bearing={0}
          mapStyle={this.state.mapStyle}
          aktivKode={this.state.meta.kode}
          opplystKode={this.state.opplystKode}
          onMapBoundsChange={bounds => this.setMapBounds(bounds)}
          setLocalId={localId => this.setLocalId(localId)}
          meta={this.state.meta}
          bbox={this.state.bbox}
        />

        <MainDrawer
          handleChangeBaseMap={this.handleChangeBaseMap}
          open={this.state.showMainDrawer}
          onToggleMainDrawer={() =>
            this.setState({ showMainDrawer: !this.state.showMainDrawer })
          }
        />
        <Link to="/katalog/">
          <FloatingActionButton
            style={{ position: 'absolute', bottom: 48, left: 48 }}
          >
            <KatalogIkon />
          </FloatingActionButton>
        </Link>
        {!this.state.showMainDrawer && (
          <div
            style={{
              backgroundColor: '#fff',
              position: 'absolute',
              left: 8,
              top: 10,
              width: 392,
              zIndex: 2,
            }}
          >
            <VenstreVinduContainer
              onToggleMainDrawer={() =>
                this.setState({ showMainDrawer: !this.state.showMainDrawer })
              }
              mapbounds={this.state.mapbounds}
              onMouseEnter={kode => this.setState({ opplystKode: kode })}
              onMouseLeave={kode => this.setState({ opplystKode: null })}
              handleFitBounds={bbox => this.setBBox(bbox)}
              language={this.state.language}
              localId={this.state.localId}
              meta={this.state.meta}
              handleUpdateLayerProp={this.handleUpdateLayerProp}
            />
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(Grunnkart)
