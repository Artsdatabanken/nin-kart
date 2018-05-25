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
import AktiveKartlag from '../AktiveKartlag/index'

type State = {
  valgteKoder: Array<string>,
  fjernKode: Array<string>,
  baseMapStyle: Object,
  mapStyle: string,
  showMainDrawer: boolean,
  visValgte: boolean,
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
      fjernKode: [],
      baseMapStyle: defaultMapStyle,
      mapStyle: '',
      showMainDrawer: false,
      visValgte: false,
      pointProperties: {},
      meta: {},
      localId: '',
      mapBounds: {},
      opplystKode: '',
      bbox: {},
      ekspandertKode: null,
    }
    this.redirectTo(props.location.pathname.replace('/katalog/', ''))
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
    var origlayers = this.state.baseMapStyle.get('layers')
    var firstSymbolId = origlayers.findIndex(function(obj) {
      return obj.get('type') === 'symbol'
    })

    const layers = this.state.baseMapStyle
      .get('layers')
      //.splice(firstSymbolId, 0, NiNHover)
      .splice(firstSymbolId, 0, NiN)
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

  visValgte = () => {
    this.setState({
      visValgte: true,
    })
  }
  addSelected = props => {
    let koder = this.state.valgteKoder.slice()
    let kodeFinnes = false
    koder.forEach(valgtKode => {
      if (valgtKode.kode === props.kode) {
        kodeFinnes = true // finnes fra før
      }
    })
    if (!kodeFinnes) {
      // Object.keys(props.barn).forEach(kode => {
      //   koder.push(
      //       {farge: props.barn[kode].farge,
      //       kode: kode,
      //       sti: props.barn[kode].sti,
      //       tittel: props.barn[kode].tittel,
      //       forelder: props.kode,
      //   })
      // })
      if (props.barn) {
        Object.keys(props.barn).forEach(kode => {
          const item = props.barn[kode]
          item.kode = kode
          item.vis = true
        })
      }
      koder.push({
        // Forelder
        farge: props.farge,
        kode: props.kode,
        sti: props.sti,
        tittel: props.tittel,
        vis: true,
        barn: props.barn,
      })
      console.log('addSelected:' + props.kode)
    }
    this.setState({
      valgteKoder: koder,
      visValgte: true,
      fjernKode: [],
    })
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
      this.setState({ meta: '' })
      return
    }

    backend.hentKodeMeta(url).then(data => {
      if (!data) return this.redirectTo('')
      if (data.se) {
        const newUrl = data.se[Object.keys(data.se)[0]].sti
        this.redirectTo(newUrl)
        return
      }
      if (data.barn && Object.keys(data.barn).length > 100) {
        data.barn = { mange: { tittel: { nb: 'TODO i grunnkart.js' } } }
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
    meta.forEach(item => {
      if (item.kode === kode) {
        item[key] = value
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
      const removeLayers = ['valgt' + kode]
      Object.keys(meta[remove].barn).forEach(barnKode => {
        removeLayers.push('valgt' + barnKode)
      })
      meta.splice(remove, 1)
      this.setState({
        valgteKoder: meta,
        fjernKode: removeLayers,
      })
    }
  }

  handleShowColorpicker = kode => {
    let nyKode = this.state.ekspandertKode === kode ? null : kode
    this.setState({ ekspandertKode: nyKode })
  }
  handleToggleVisible = kode => {
    let meta = this.state.valgteKoder
    Object.keys(meta).forEach(id => {
      const forelder = meta[id]
      let overstyrBarn = false
      if (forelder.kode === kode) {
        forelder.vis = !forelder.vis
        overstyrBarn = true
      }
      if (forelder.barn) {
        Object.keys(forelder.barn).forEach(barnId => {
          const barn = forelder.barn[barnId]
          if (overstyrBarn) {
            barn.vis = forelder.vis
          } else if (barn.kode === kode) {
            barn.vis = !barn.vis
          }
        })
      }
    })
    this.setState({
      valgteKoder: meta,
      vis: this.state.vis ? false : true,
    })
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
          aktivKode={!this.state.visValgte ? aktivKode : ''}
          opplystKode={!this.state.visValgte ? this.state.opplystKode : ''}
          valgteKoder={this.state.visValgte ? this.state.valgteKoder : []}
          fjernKode={this.state.fjernKode ? this.state.fjernKode : []}
          onMapBoundsChange={bounds => this.handleMapBoundsChange(bounds)}
          setLocalId={localId => {
            if (localId !== this.state.localId) {
              this.setState({
                localId: localId,
                visValgte: false,
              })
            } else if (this.state.visValgte) {
              this.setState({
                visValgte: false,
              })
            }
          }}
          meta={this.state.meta}
          bbox={this.state.bbox}
          oppdaterSkjulLag={this.state.vis}
          oppdaterFarger={this.state.ekspandertKode}
        />

        <MainDrawer
          handleChangeBaseMap={this.handleChangeBaseMap}
          open={this.state.showMainDrawer}
          onToggleMainDrawer={() =>
            this.setState({ showMainDrawer: !this.state.showMainDrawer })
          }
        />

        {!this.state.showMainDrawer &&
          !this.state.visValgte && (
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
                onExitToRoot={props => this.visValgte()}
                localId={this.state.localId}
                meta={this.state.meta}
                handleUpdateLayerProp={this.handleUpdateLayerProp}
                onShowColorpicker={this.handleShowColorpicker}
                ekspandertKode={this.state.ekspandertKode}
                visValgte={this.state.visValgte}
              />
            </div>
          )}
        {this.state.visValgte && (
          <div>
            <div
              style={{
                position: 'absolute',
                left: 8,
                top: 10,
                width: 392,
                zIndex: 2,
              }}
            >
              <div
                style={{
                  backgroundColor: '#fff',
                }}
              >
                {this.state.valgteKoder.length > 0 && (
                  <AktiveKartlag
                    style={{
                      backgroundColor: '#fff',
                    }}
                    title={`Valgte koder (${this.state.valgteKoder.length})`}
                    koder={this.state.valgteKoder}
                    onGoToCode={kode => {
                      this.setState({
                        visValgte: false,
                      })
                      this.redirectTo(kode)
                    }}
                    onMouseEnter={kode => this.setState({ opplystKode: kode })}
                    onMouseLeave={() =>
                      this.setState({
                        opplystKode: '',
                      })
                    }
                    onShowColorpicker={this.handleShowColorpicker}
                    onToggleVisible={this.handleToggleVisible}
                    onUpdateLayerProp={this.handleUpdateSelectedLayerProp}
                    onRemoveSelectedLayer={this.handleRemoveSelectedLayer}
                    ekspandertKode={this.state.ekspandertKode}
                  />
                )}
              </div>
              <div style={{ float: 'left', paddingTop: 10 }}>
                <Link
                  to={`/katalog/`}
                  onClick={e =>
                    this.setState({
                      opplystKode: '',
                      meta: {},
                      visValgte: false,
                    })
                  }
                >
                  <FloatingActionButton
                  //style={{ position: 'absolute', bottom: 48, left: 48 }}
                  >
                    <KatalogIkon />
                  </FloatingActionButton>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(Grunnkart)
