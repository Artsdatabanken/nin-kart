// @flow
import React from 'react'
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
  NiNHover,
} from '../Kart/Mapbox/MapStyle'
import { withRouter } from 'react-router'
import VenstreVinduContainer from '../VenstreVinduContainer'
import Kart from '../Kart'
import backend from '../backend'

type State = {
  language: Array<string>,
  baseMapStyle: Object,
  mapStyle: string,
  showMainDrawer: boolean,
  pointProperties: Object,
  meta: Object,
  localId: string,
  mapBounds: Object,
  bbox: Object,
  opplystKode: string,
}

type Props = {
  location: Object,
  history: Object,
}

class Grunnkart extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      language: ['nb', 'la'],
      baseMapStyle: defaultMapStyle,
      mapStyle: '',
      showMainDrawer: false,
      pointProperties: {},
      meta: {},
      localId: '',
      mapBounds: {},
      opplystKode: '',
      bbox: {},
    }
  }

  handleChangeBaseMap = type => {
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
    const layers = this.state.baseMapStyle
      .get('layers')
      .push(NiN)
      .push(NiNHover)
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

  handleMapBoundsChange = this.debounce(function(bounds) {
    this.setState({ mapBounds: bounds })
  }, 50)

  handleFitBounds = this.debounce(function(bbox) {
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

  redirectTo(path) {
    const newUrl = '/katalog/' + path
    console.log('router videre til ', newUrl)
    this.props.history.replace(newUrl)
  }

  fetchMeta(url) {
    url = url.toLowerCase()
    let kodematch = url.match(/\/katalog\/(.*)/)
    if (!kodematch || kodematch.length !== 2) {
      return
    }

    backend.hentKodeMeta(url).then(data => {
      if (!data) return this.redirectTo('')
      if (data && data.se) {
        const newUrl = data.se[Object.keys(data.se)[0]].sti
        this.redirectTo(newUrl)
        return
      }
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
    const aktivKode =
      this.state.meta && this.state.meta.kode ? this.state.meta.kode : ''
    return (
      <div>
        <Kart
          latitude={65.4}
          longitude={10.8}
          zoom={3}
          pitch={0}
          bearing={0}
          mapStyle={this.state.mapStyle}
          aktivKode={aktivKode}
          opplystKode={this.state.opplystKode}
          onMapBoundsChange={bounds => this.handleMapBoundsChange(bounds)}
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
        <Link to={`/katalog/`}>
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
              mapBounds={this.state.mapBounds}
              onMouseEnter={kode => this.setState({ opplystKode: kode })}
              onMouseLeave={kode => this.setState({ opplystKode: '' })}
              onFitBounds={bbox => this.handleFitBounds(bbox)}
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
