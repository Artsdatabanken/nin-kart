// @flow
import typesystem from '@artsdatabanken/typesystem'
import React from 'react'
import { withRouter } from 'react-router'
import backend from '../backend'
import Kart from '../Kart'
import { SettingsContext } from '../SettingsContext'
import språk from '../språk'
import VenstreVinduContainer from '../VenstreVinduContainer'
import MainDrawer from './MainDrawer'
import standardlag from './standardlag.json'

type State = {
  aktiveLag: Array<Object>,
  showMainDrawer: boolean,
  meta: Object,
  fitBounds: Object,
  actualBounds: Object,
  opplystKode: string,
  visKoder: boolean,
}

type Props = {
  location: Object,
  history: Object,
}

/*
function setFargeKode(kode, farge) {
  let farger = JSON.parse(localStorage.getItem('customColors') || '[]')
  farger = farger.filter(x => x.kode !== kode)
  farger.push({ kode: kode, farge: farge })
  localStorage.setItem('customColors', JSON.stringify(farger))
  this.updateColor(kode, farge)
}

function getFargeKode(kode) {
  if (localStorage) {
    let customColors = localStorage.getItem('customColors')
    if (customColors) {
      let fargeElement = JSON.parse(customColors).filter(x => x.kode === kode)
      return fargeElement && fargeElement[0] && fargeElement[0].farge
        ? fargeElement[0].farge
        : this.props.farge
    }
  }
  return this.props.farge
}
*/
class Grunnkart extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      aktiveLag: standardlag,
      showMainDrawer: false,
      opplystKode: '',
      actualBounds: null,
      fitBounds: null,
      meta: null,
      visKoder: false,
    }
  }

  handleActualBoundsChange = bounds => {
    this.setState({ actualBounds: bounds, fitBounds: null })
  }

  handleFitBounds = bbox => {
    this.setState({ fitBounds: bbox })
  }

  handleBoundsChange = bbox => {
    this.setState({ actualBounds: bbox })
  }

  addSelectedBarn(barn) {
    return Object.keys(barn).map(key => {
      const node = barn[key]
      return {
        kode: key,
        tittel: språk(node.tittel),
        farge: node.farge,
        erSynlig: true,
        kanSlettes: true,
      }
    })
  }

  addSelected = props => {
    let koder = this.state.aktiveLag
    const nyttLag = {
      farge: props.farge,
      kode: props.kode,
      tittel: språk(props.tittel),
      barn: this.addSelectedBarn(props.barn),
      visBarn: Object.keys(props.barn).length > 0,
      erSynlig: true,
      kanSlettes: true,
    }
    koder.unshift(nyttLag)

    this.setState({
      aktiveLag: koder,
    })
  }

  handleToggleLayer = (kode, enabled) => {
    if (enabled) this.addSelected(this.state.meta)
    else {
      const koder = this.state.aktiveLag.filter(barn => barn.kode !== kode)
      this.setState({
        aktiveLag: koder,
      })
    }
  }

  _handleKeyDown = event => {
    const ESCAPE_KEY = 27
    switch (event.keyCode) {
      case ESCAPE_KEY:
        this.props.history.goBack()
        break
      default:
        break
    }
  }

  componentDidMount() {
    this.fetchMeta(this.props.location.pathname)
    window.addEventListener('keydown', this._handleKeyDown)
  }

  componentDidUnMount() {
    window.removeEventListener('keydown', this._handleKeyDown)
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

  // AO_01/02 => ao/01/02
  kodeTilRelativUrl(kode) {
    return typesystem
      .splittKode(kode)
      .join('/')
      .toLowerCase()
  }

  fetchMeta(url) {
    url = url.toLowerCase()
    let kodematch = url.match(/\/katalog\/(.*)/)
    if (!kodematch || kodematch.length !== 2) {
      this.setState({ meta: null })
      return
    }

    backend.hentKodeMeta(url).then(data => {
      if (!data) return this.redirectTo('')
      if (data.se) {
        const newUrl = data.se[Object.keys(data.se)[0]].sti
        this.redirectTo(newUrl)
        return
      }
      const sti = this.kodeTilRelativUrl(data.kode)
      data.sti = sti
      if (!data.barn) data.barn = {}
      Object.keys(data.barn).forEach(kode => {
        const barn = data.barn[kode]
        barn.sti = this.kodeTilRelativUrl(kode)
        //        barn.farge = new color(barn.farge).darken(10).toHexString()
      })
      data.nivå = typesystem.hentNivaa(data.kode).slice(0, 1)
      data.prefiks = data.kode.substring(0, 2)
      this.setState({ meta: data })
    })
  }

  handleRemoveSelectedLayer = kode => {
    let aktive = this.state.aktiveLag
    this.setState({
      aktiveLag: aktive.filter(e => e.kode !== kode),
    })
    this.props.history.push('/')
  }

  handleUpdateLayerProp = (kode, key, value) => {
    const aktive = this.state.aktiveLag
    const aktivt = aktive.find(x => x.kode === kode)
    aktivt[key] = value
    this.setState({ aktiveLag: [...aktive] })
  }

  handleUpdateSetting = (key, value) => {
    console.log({ [key]: value })
    this.setState({ [key]: value })
  }

  render() {
    let erAktivert = false
    if (this.state.meta)
      erAktivert = !!this.state.aktiveLag.find(
        vk => vk.kode === this.state.meta.kode
      )
    return (
      <SettingsContext.Provider value={{ visKoder: this.state.visKoder }}>
        <MainDrawer
          erÅpen={this.state.showMainDrawer}
          toggleDrawer={() =>
            this.setState({ showMainDrawer: !this.state.showMainDrawer })
          }
          visKoder={this.state.visKoder}
          onUpdateSetting={this.handleUpdateSetting}
        />

        <VenstreVinduContainer
          aktiveLag={this.state.aktiveLag}
          mapBounds={this.state.actualBounds}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onToggleMainDrawer={() =>
            this.setState({ showMainDrawer: !this.state.showMainDrawer })
          }
          onFitBounds={this.handleFitBounds}
          erAktivert={erAktivert}
          opplystKode={this.state.opplystKode}
          onToggleLayer={this.handleToggleLayer}
          onRemoveSelectedLayer={this.handleRemoveSelectedLayer}
          meta={this.state.meta}
          onUpdateLayerProp={this.handleUpdateLayerProp}
        />

        <Kart
          bounds={this.state.fitBounds}
          latitude={65.4}
          longitude={10.8}
          zoom={3}
          aktiveLag={this.state.aktiveLag}
          opplystKode={this.state.opplystKode}
          meta={this.state.meta}
          onMapBoundsChange={this.handleActualBoundsChange}
        />
      </SettingsContext.Provider>
    )
  }

  handleMouseEnter = kode => {
    this.setState({ opplystKode: kode })
  }

  handleMouseLeave = kode => {
    this.setState({ opplystKode: '' })
  }
}

export default withRouter(Grunnkart)
