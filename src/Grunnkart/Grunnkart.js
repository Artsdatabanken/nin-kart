// @flow
import React from 'react'
import { withRouter } from 'react-router'
import backend from '../backend'
import Kart from '../Kart'
import VenstreVinduContainer from '../VenstreVinduContainer'
import MainDrawer from './MainDrawer'

type State = {
  valgteKoder: Array<string>,
  language: Array<string>,
  mapStyle: string,
  showMainDrawer: boolean,
  visValgte: boolean,
  pointProperties: Object,
  meta: Object,
  localId: string,
  fitBounds: Object,
  actualBounds: Object,
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
      language: ['nb', 'la'],
      mapStyle: '',
      showMainDrawer: false,
      visValgte: false,
      pointProperties: {},
      meta: {},
      opplystKode: '',
      refresh: false,
    }
    //    this.redirectTo(props.location.pathname.replace('/katalog/', ''))
  }

  handleActualBoundsChange = bounds => {
    console.log('!!!!!', bounds)
    this.setState({ actualBounds: bounds, fitBounds: null })
  }

  handleFitBounds = bbox => {
    this.setState({ fitBounds: bbox })
  }

  handleBoundsChange = bbox => {
    this.setState({ actualBounds: bbox })
  }

  addSelected = props => {
    let koder = this.state.valgteKoder
    koder.push({
      farge: props.farge,
      kode: props.kode,
      sti: props.sti,
      tittel: props.tittel,
      barn: props.barn,
    })
    console.log(koder)

    this.setState({
      valgteKoder: koder,
    })
  }

  handleToggleLayer = (kode, enabled) => {
    if (enabled) this.addSelected(this.state.meta)
    else {
      const koder = this.state.valgteKoder.filter(barn => barn.kode !== kode)
      this.setState({
        valgteKoder: koder,
      })
    }
  }

  componentDidMount() {
    this.fetchMeta(this.props.location.pathname)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location.pathname !== prevProps.location.pathname)
      this.fetchMeta(this.props.location.pathname)
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
    let aktive = this.state.valgteKoder
    delete aktive[kode]
    this.setState({
      valgteKoder: aktive,
    })
  }

  updateColor(kode, farge) {
    let meta = this.state.valgteKoder
    Object.keys(meta).forEach(id => {
      const forelder = meta[id]

      if (forelder.kode === kode) {
        forelder.farge = farge
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
          bounds={this.state.fitBounds}
          latitude={65.4}
          longitude={10.8}
          zoom={3}
          pitch={0}
          bearing={0}
          aktivKode={aktivKode}
          aktiveLag={this.state.valgteKoder}
          opplystKode={this.state.opplystKode}
          onMapBoundsChange={this.handleActualBoundsChange}
          meta={this.state.meta}
        />

        <MainDrawer
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
            mapBounds={this.state.actualBounds}
            onMouseEnter={kode => this.setState({ opplystKode: kode })}
            onMouseLeave={kode =>
              this.setState({
                opplystKode: '',
              })
            }
            onFitBounds={this.handleFitBounds}
            isActiveLayer={erAktivert}
            onToggleLayer={this.handleToggleLayer}
            onRemoveSelectedLayer={this.handleRemoveSelectedLayer}
            onExitToRoot={() => this.props.history.replace('/')}
            meta={this.state.meta}
            updateColor={(kode, farge) => this.updateColor(kode, farge)}
          />
        )}
      </div>
    )
  }
}

export default withRouter(Grunnkart)
