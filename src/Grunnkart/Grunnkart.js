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
  lightMapStyle,
  satelliteStyle,
  NiN,
  NiNHover,
} from '../Kart/Mapbox/MapStyle'
import { withRouter } from 'react-router'
import VenstreVinduContainer from '../VenstreVinduContainer'
import Kart from '../Kart'
import backend from '../backend'
import ValgtListe from '../Kodetre/Kodeliste/ValgtListe'

type State = {
  valgteKoder: Array<string>,
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
      valgteKoder: [],
      baseMapStyle: defaultMapStyle,
      mapStyle: '',
      showMainDrawer: false,
      pointProperties: {},
      meta: {},
      localId: '',
      mapBounds: {},
      opplystKode: '',
      bbox: {},
      ekspandertKode: null,
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
      case 'light': {
        newStyle = lightMapStyle
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

  handleMapBoundsChange = backend.debounce(function(bounds) {
    this.setState({ mapBounds: bounds })
  }, 50)

  handleFitBounds = backend.debounce(function(bbox) {
    this.setState({ bbox: bbox })
  }, 50)

  addSelected = props => {
    let koder = this.state.valgteKoder.slice()
    let kodeFinnes = false
    koder.forEach(barn => {
      if (barn.kode === props.kode) {
        kodeFinnes = true // finnes fra før
      }
    })
    if (!kodeFinnes) {
      koder.push(props)
      this.setState({
        valgteKoder: koder,
      })
      console.log('addSelected:' + props.kode)
    }
  }

  setLocalId(localId) {
    if (localId !== this.state.localId) {
      this.setState({ localId: localId })
    }
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
    let layer = meta.barn[kode] || meta.barn[kode.toUpperCase()]
    layer[key] = value
    this.setState({ meta: meta })
  }
  handleUpdateSelectedLayerProp = (kode, key, value) => {
    let meta = this.state.valgteKoder
    meta.forEach(barn => {
      if (barn.kode === kode) {
        barn[key] = value
      }
    })
    this.setState({ valgteKoder: meta })
  }
  handleRemoveSelectedLayer = kode => {
    let meta = this.state.valgteKoder
    let remove = -1
    Object.keys(meta).forEach(id => {
      if (meta[id].kode === kode) {
        remove = id
      }
    })
    if (remove >= 0) {
      meta.splice(remove, 1)
      this.setState({
        valgteKoder: meta,
        fjernKode: 'valgt' + kode,
      })
    }
  }

  handleMouseOver(a, b, c) {
    console.log(a.key)
  }

  handleShowColorpicker = kode => {
    let nyKode = this.state.ekspandertKode === kode ? null : kode
    this.setState({ ekspandertKode: nyKode })
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
          valgteKoder={this.state.valgteKoder}
          fjernKode={this.state.fjernKode}
          onMapBoundsChange={bounds => this.handleMapBoundsChange(bounds)}
          setLocalId={localId => this.setLocalId(localId)}
          meta={this.state.meta}
          bbox={this.state.bbox}
          oppdaterFarger={this.state.ekspandertKode}
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
                this.setState({
                  showMainDrawer: !this.state.showMainDrawer,
                })
              }
              mapBounds={this.state.mapBounds}
              onMouseEnter={kode => this.setState({ opplystKode: kode })}
              onMouseLeave={kode =>
                this.setState({
                  opplystKode: '',
                })
              }
              onFitBounds={bbox => this.handleFitBounds(bbox)}
              onAddSelected={props => this.addSelected(props)}
              localId={this.state.localId}
              meta={this.state.meta}
              handleUpdateLayerProp={this.handleUpdateLayerProp}
              onShowColorpicker={this.handleShowColorpicker}
              ekspandertKode={this.state.ekspandertKode}
            />
          </div>
        )}
        {this.state.valgteKoder.length > 0 && (
          <div
            style={{
              backgroundColor: '#fff',
              position: 'absolute',
              right: 8,
              top: 10,
              width: 392,
              zIndex: 2,
            }}
          >
            <ValgtListe
              title={`Valgte koder`}
              koder={this.state.valgteKoder}
              onGoToCode={kode => this.redirectTo(kode)}
              onMouseEnter={kode => this.setState({ opplystKode: kode })}
              onMouseLeave={() =>
                this.setState({
                  opplystKode: '',
                })
              }
              onShowColorpicker={this.handleShowColorpicker}
              onUpdateLayerProp={this.handleUpdateSelectedLayerProp}
              onRemoveSelectedLayer={this.handleRemoveSelectedLayer}
              ekspandertKode={this.state.ekspandertKode}
            />
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(Grunnkart)
