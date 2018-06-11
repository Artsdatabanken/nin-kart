// @flow
import React from 'react'
import { withRouter } from 'react-router'
import Kart from '../Kart'
import {
  NiN,
  NiNHover,
  darkMapStyle,
  defaultMapStyle,
  lightMapStyle,
  satelliteStyle,
  vintageMapStyle,
} from '../Kart/Mapbox/MapStyle'
import VenstreVinduContainer from '../VenstreVinduContainer'
import backend from '../backend'
import localStorageHelper from '../localStorageHelper'
import MainDrawer from './MainDrawer'

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
  refresh: boolean,
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
      refresh: false,
    }
    //    this.redirectTo(props.location.pathname.replace('/katalog/', ''))
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
  visKatalog = () => {
    this.setState({
      visValgte: false,
    })
  }
  addSelected = props => {
    let koder = this.state.valgteKoder.slice()
    let kodeFinnes = false
    let kodeFinnesHosBarn = false
    let verdiPaaEksisterendeKode = false
    koder.forEach(valgtKode => {
      if (valgtKode.kode === props.kode) {
        kodeFinnes = true // finnes fra før
      }
    })
    if (!kodeFinnes) {
      // sjekk om kode finnes som barn av annen forelder
      koder.forEach(valgtKode => {
        Object.keys(valgtKode.barn).forEach(id => {
          if (valgtKode.barn[id].kode === props.kode) {
            kodeFinnesHosBarn = true // finnes fra før
            verdiPaaEksisterendeKode = valgtKode.barn[id].vis
          }
        })
      })

      if (props.barn) {
        Object.keys(props.barn).forEach(kode => {
          const item = props.barn[kode]
          item.kode = kode
          item.vis = kodeFinnesHosBarn ? verdiPaaEksisterendeKode : true
        })
      }
      koder.push({
        // Forelder
        farge: props.farge,
        kode: props.kode,
        sti: props.sti,
        tittel: props.tittel,
        vis: kodeFinnesHosBarn ? verdiPaaEksisterendeKode : true,
        barn: props.barn,
        removable: true,
        bbox: props.bbox,
      })

      this.setState({
        valgteKoder: koder,
        visValgte: true,
        fjernKode: [],
      })
    }
  }
  handleToggleLayer = (kode, state) => {
    if (state) this.addSelected(this.state.meta)
    else {
      const koder = this.state.valgteKoder.filter(barn => barn.kode !== kode)
      this.setState({
        valgteKoder: koder,
        visValgte: true,
        fjernKode: [kode],
      })
    }

    this.props.history.push('/')
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
      localStorageHelper.overrideFarger(data)
      this.setState({ meta: data ? data : '' })
    })
  }

  handleUpdateSelectedLayerProp = (kode, propNavn, verdi) => {
    let valgte = this.state.valgteKoder
    const barn = valgte.find(barn => barn.kode === kode)
    barn[propNavn] = verdi
    this.setState({ valgteKoder: valgte })
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

  handleToggleVisible = (kode, overstyr, verdi) => {
    let meta = this.state.valgteKoder
    let overstyrteBarneKoder = []
    let overstyrtVerdi = false
    Object.keys(meta).forEach(id => {
      const forelder = meta[id]
      let overstyrBarn = false
      if (forelder.kode === kode) {
        forelder.vis = overstyr ? verdi : !forelder.vis
        overstyrtVerdi = forelder.vis
        overstyrBarn = true
      }
      if (forelder.barn) {
        Object.keys(forelder.barn).forEach(barnId => {
          const barn = forelder.barn[barnId]
          if (overstyrBarn) {
            barn.vis = forelder.vis
            overstyrteBarneKoder.push(barn.kode)
          } else if (barn.kode === kode) {
            barn.vis = overstyr ? verdi : !barn.vis
          }
        })
      }
    })
    // sjekk om noen av barna som ble overstyrt også finnes som foreldre i lista
    if (overstyrteBarneKoder.length > 0) {
      Object.keys(meta).forEach(id => {
        const forelder = meta[id]
        if (overstyrteBarneKoder.indexOf(forelder.kode) >= 0) {
          // recursive call with the toggled code
          this.handleToggleVisible(forelder.kode, true, overstyrtVerdi)
        }
      })
    }

    this.setState({
      valgteKoder: meta,
      vis: !this.state.vis,
    })
  }

  updateColor(kode, farge) {
    let meta = this.state.valgteKoder
    Object.keys(meta).forEach(id => {
      const forelder = meta[id]

      if (forelder.kode === kode) {
        forelder.farge = farge
      }
      if (forelder.barn) {
        Object.keys(forelder.barn).forEach(barnId => {
          const barn = forelder.barn[barnId]
          if (barn.kode === kode) {
            barn.farge = farge
          }
        })
      }
    })
    this.setState({
      valgteKoder: meta,
      refresh: !this.state.refresh,
    })
  }

  render() {
    const erAktivert = !!this.state.valgteKoder.find(
      vk => vk.kode === this.state.meta.kode
    )
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
              this.setState({ localId: localId, visValgte: false })
            } else if (this.state.visValgte) {
              this.setState({ visValgte: false })
            }
          }}
          meta={this.state.meta}
          bbox={this.state.bbox}
          oppdaterSkjulLag={this.state.vis}
          oppdaterFarger={this.state.refresh}
        />

        <MainDrawer
          handleChangeBaseMap={this.handleChangeBaseMap}
          open={this.state.showMainDrawer}
          onToggleMainDrawer={() =>
            this.setState({ showMainDrawer: !this.state.showMainDrawer })
          }
        />

        {!this.state.showMainDrawer && (
          <VenstreVinduContainer
            valgteKoder={this.state.valgteKoder}
            onToggleMainDrawer={() =>
              this.setState({
                showMainDrawer: !this.state.showMainDrawer,
              })
            }
            mapBounds={this.state.mapBounds}
            onToggleVisible={this.handleToggleVisible}
            onMouseEnter={kode => this.setState({ opplystKode: kode })}
            onMouseLeave={kode =>
              this.setState({
                opplystKode: '',
              })
            }
            onFitBounds={bbox => this.handleFitBounds(bbox)}
            isActiveLayer={erAktivert}
            onToggleLayer={this.handleToggleLayer}
            onRemoveSelectedLayer={this.handleRemoveSelectedLayer}
            onExitToRoot={this.visValgte}
            visKatalog={this.visKatalog}
            localId={this.state.localId}
            meta={this.state.meta}
            updateColor={(kode, farge) => this.updateColor(kode, farge)}
          />
        )}
      </div>
    )
  }
}

export default withRouter(Grunnkart)
