// @flow
import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import backend from '../backend'
import Kart from '../Kart'
import VenstreVinduContainer from '../VenstreVinduContainer'
import MainDrawer from './MainDrawer'

type State = {
  language: Array<string>,
  baseMapStyle: string,
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
      language: ['nb', 'la'],
      baseMapStyle: 'aNiceDefault',
      mapStyle: '',
      showMainDrawer: false,
      visValgte: false,
      pointProperties: {},
      meta: {},
      localId: '',
      mapBounds: {},
      opplystKode: '',
      bbox: {},
    }
    //    this.redirectTo(props.location.pathname.replace('/katalog/', ''))
  }

  handleChangeBaseMap = type => {
    console.log(type)
    this.setState({
      baseMapStyle: type,
    })
  }

  handleMapBoundsChange = bounds => {
    console.log(bounds)
    this.setState({ mapBounds: bounds })
  }
  handleFitBounds = bbox => this.setState({ bbox: bbox })

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
    koder.forEach(valgtKode => {
      if (valgtKode.kode === props.kode) {
        kodeFinnes = true // finnes fra før
      }
    })
    if (!kodeFinnes) {
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
        removable: true,
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
      this.setState({ meta: data })
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
      vis: !this.state.vis,
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
          aktivKode={aktivKode}
          opplystKode={this.state.opplystKode}
          onMapBoundsChange={this.handleMapBoundsChange}
          meta={this.state.meta}
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
          />
        )}
      </div>
    )
  }
}

export default withRouter(Grunnkart)
