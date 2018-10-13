// @flow
import typesystem from '@artsdatabanken/typesystem'
import React from 'react'
import { withRouter } from 'react-router'
import AktiveKartlag from '../AktiveKartlag/'
import backend from '../backend'
import Kart from '../Kart'
import { SettingsContext } from '../SettingsContext'
import språk from '../språk'
import VenstreVinduContainer from '../VenstreVinduContainer'
import AktiveKartlagKnapp from './AktiveKartlagKnapp'
import standardlag from './standardlag.json'
import bakgrunnskarttema from './bakgrunnskarttema'

type State = {
  aktiveLag: Array<Object>,
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
class Grunnkart extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    const aktive = JSON.parse(JSON.stringify(standardlag))
    aktive[0] = bakgrunnskarttema[aktive[0].tema] // HACK
    this.state = {
      aktiveLag: aktive,
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

  handleAktiver = koder => {
    this.setState({
      aktiveLag: JSON.parse(JSON.stringify(standardlag)),
    })
    koder.forEach(kode => {
      this.fetchMeta2('/katalog/' + this.kodeTilRelativUrl(kode)).then(data => {
        this.addSelected(data)
      })
    })
  }

  addSelected = props => {
    let koder = this.state.aktiveLag
    const formats = props.formats || { polygon: 'pbf' }
    const sourceType = Object.keys(formats)[0]
    const fileFormat = formats[sourceType]
    const nyttLag = {
      type: sourceType,
      fileFormat: fileFormat,
      farge: props.farge,
      kode: props.kode,
      tittel: språk(props.tittel),
      barn: this.addSelectedBarn(props.barn),
      visBarn: Object.keys(props.barn).length > 0,
      bbox: props.bbox,
      zoom: props.zoom,
      erSynlig: true,
      kanSlettes: true,
      formats: formats,
    }
    if (formats.gradient) {
      nyttLag.gradient = { filterMin: 0, filterMax: 1.0 }
    }
    koder.unshift(nyttLag)

    this.setState({
      aktiveLag: [...koder],
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

    this.fetchMeta2(url).then(data => {
      if (!data) return this.redirectTo('')
      if (data.se) {
        const newUrl = data.se[Object.keys(data.se)[0]].sti
        this.redirectTo(newUrl)
        return
      }
      console.warn(data)
      this.setState({ meta: data })
    })
  }

  async fetchMeta2(url) {
    const data = await backend.hentKodeMeta(url)
    if (!data) return
    if (data.se) return data

    const sti = this.kodeTilRelativUrl(data.kode)
    data.sti = sti
    if (!data.barn) data.barn = {}
    Object.keys(data.barn).forEach(kode => {
      const barn = data.barn[kode]
      barn.sti = this.kodeTilRelativUrl(kode)
    })
    data.nivå = typesystem.hentNivaa(data.kode).slice(0, 1)
    data.prefiks = data.kode.substring(0, 2)
    return data
  }

  handleRemoveSelectedLayer = kode => {
    let aktive = this.state.aktiveLag
    this.setState({
      aktiveLag: aktive.filter(e => e.kode !== kode),
    })
    this.props.history.push('/')
  }

  // Supports composite keys i.e. gradient.filterMin
  handleUpdateLayerProp = (kode, key, value) => {
    const aktive = this.state.aktiveLag
    let node = aktive.find(x => x.kode === kode)
    const parts = key.split('.')
    for (let i = 0; i < parts.length - 1; i++) node = node[parts[i]]
    const vkey = parts[parts.length - 1]
    node[vkey] = value
    if (vkey === 'tema')
      // HACK
      aktive[0] = JSON.parse(JSON.stringify(bakgrunnskarttema[value]))

    this.setState({ aktiveLag: [...aktive] })
  }

  render() {
    let erAktivert = false
    if (this.state.meta)
      erAktivert = !!this.state.aktiveLag.find(
        vk => vk.kode === this.state.meta.kode
      )
    return (
      <SettingsContext.Consumer>
        {context => {
          return (
            <React.Fragment>
              {context.visAktiveLag ? (
                <div
                  style={{
                    backgroundColor: '#fff',
                    position: 'absolute',
                    width: 408,
                    right: 0,
                    bottom: 0,
                    boxShadow:
                      '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
                  }}
                >
                  <AktiveKartlag
                    koder={this.state.aktiveLag}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                    onUpdateLayerProp={this.handleUpdateLayerProp}
                    onRemoveSelectedLayer={this.handleRemoveSelectedLayer}
                  />
                </div>
              ) : (
                <AktiveKartlagKnapp onClick={context.onToggleAktiveLag} />
              )}

              <VenstreVinduContainer
                aktiveLag={this.state.aktiveLag}
                mapBounds={this.state.actualBounds}
                onAktiver={this.handleAktiver}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onFitBounds={this.handleFitBounds}
                erAktivert={erAktivert}
                opplystKode={this.state.opplystKode}
                onToggleLayer={this.handleToggleLayer}
                onRemoveSelectedLayer={this.handleRemoveSelectedLayer}
                meta={this.state.meta}
                onUpdateLayerProp={this.handleUpdateLayerProp}
                visForside={context.visForside}
                onToggleForside={context.onToggleForside}
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
                onMapMove={context.onMapMove}
              />
            </React.Fragment>
          )
        }}
      </SettingsContext.Consumer>
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
