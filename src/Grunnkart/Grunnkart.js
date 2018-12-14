// @flow
import typesystem from '@artsdatabanken/typesystem'
import React from 'react'
import { withRouter } from 'react-router'
import { withStyles } from '@material-ui/core'
import classNames from 'classnames'
import backend from '../backend'
import Kart from '../Kart'
import { SettingsContext } from '../SettingsContext'
import språk from '../språk'
import VenstreVinduContainer from '../VenstreVinduContainer'
import standardlag from './standardlag.json'
import bakgrunnskarttema from './bakgrunnskarttema'

type State = {
  aktiveLag: Object,
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

const styles = {
  rot: {
    backgroundColor: '#f5f5f5',
    color: 'hsla(0, 0%, 0%, 0.87)',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
    _padding: 0,
    position: 'fixed',
    left: 0,
    border: 1,
    width: 408,
    height: '100vh',
    zIndex: -10,
    _overflow: 'hidden',
    pointerEvents: 'auto',
    display: 'flex',
    flexDirection: 'column',
    _overflowX: 'hidden',
  },
  transparent: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    pointerEvents: 'none',
  },
  padTop: { paddingTop: 55 },
}

class Grunnkart extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    let aktive = standardlag
    aktive.bakgrunnskart = bakgrunnskarttema[aktive.bakgrunnskart.tema] // HACK
    aktive = JSON.parse(JSON.stringify(aktive))
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
        value: node.value,
      }
    })
  }

  handleAktiver = koder => {
    this.setState({
      aktiveLag: JSON.parse(JSON.stringify(standardlag)),
    })
    koder.forEach(kode => {
      this.fetchMeta2('/katalog/' + kode).then(data => {
        this.addSelected(data)
      })
    })
  }

  addSelected = props => {
    let aktive = this.state.aktiveLag
    const viz = props.viz
    if (!viz) return
    let activeViz = Object.keys(viz)[0]
    if (viz['raster.indexed']) activeViz = 'raster.indexed'
    if (viz.polygon) activeViz = 'polygon'
    const nyttLag = {
      viz: viz,
      activeViz: activeViz,
      farge: props.farge,
      kode: props.kode,
      tittel: språk(props.tittel),
      barn: this.addSelectedBarn(props.barn),
      visBarn: Object.keys(props.barn).length > 0,
      bbox: props.bbox,
      erSynlig: true,
      kanSlettes: true,
    }
    if (viz.gradient) {
      nyttLag.gradient = { filterMin: 0, filterMax: 1.0 }
    }
    aktive[nyttLag.kode] = nyttLag

    this.setState({
      aktiveLag: Object.assign({}, aktive),
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
    document.title =
      (this.state.meta && this.state.meta.tittel.nb) || 'Natur i Norge'
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
      this.setState({ meta: data, opplystKode: '' })
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
      barn.value = [0, 100]
    })
    data.nivå = typesystem.hentNivaa(data.kode).slice(0, 1)
    data.prefiks = data.kode.substring(0, 2)

    // HACK
    if (data.viz) {
      if (data.viz.vector) data.viz.polygon = data.viz.vector
      delete data.viz.vector
    }
    if (data.kode.substring(0, 2) === 'LA') {
      if (!this.state.aktiveLag.terreng.wasAutoEnabled) {
        this.handleUpdateLayerProp('terreng', 'erSynlig', true)
        this.handleUpdateLayerProp('terreng', 'wasAutoEnabled', true)
      }
    }
    return data
  }

  handleRemoveSelectedLayer = kode => {
    let aktive = this.state.aktiveLag
    delete aktive[kode]
    this.setState({ aktiveLag: aktive })
    this.props.history.push('/')
  }

  // Supports composite keys i.e. gradient.filterMin
  handleUpdateLayerProp = (kode, key, value) => {
    const aktive = this.state.aktiveLag
    let node = aktive[kode]
    const parts = key.split('.')
    for (let i = 0; i < parts.length - 1; i++) node = node[parts[i]]
    const vkey = parts[parts.length - 1]
    node[vkey] = value
    if (vkey === 'tema')
      // HACK
      aktive.bakgrunnskart = JSON.parse(
        JSON.stringify(bakgrunnskarttema[value])
      )
    this.setState({ aktiveLag: Object.assign({}, aktive) })
  }

  // Supports composite keys i.e. gradient.filterMin
  handleUpdateMetaProp = (kode, key, value) => {
    const aktive = this.state.meta
    let node = aktive.barn[kode]
    const parts = key.split('.')
    for (let i = 0; i < parts.length - 1; i++) node = node[parts[i]]
    const vkey = parts[parts.length - 1]
    node[vkey] = value
    aktive.barn[kode] = Object.assign({}, aktive.barn[kode])
    this.setState({ meta: Object.assign({}, aktive) })
  }

  render() {
    let erAktivert = false
    if (this.state.meta)
      erAktivert = !!this.state.aktiveLag[this.state.meta.kode]
    const { classes, history } = this.props
    return (
      <SettingsContext.Consumer>
        {context => {
          const transparent =
            !context.visForside &&
            (!history.location.search && history.location.pathname === '/')
          console.log(history)
          return (
            <React.Fragment>
              <div
                className={classNames(
                  classes.rot,
                  transparent && classes.transparent
                )}
              >
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
                  onUpdateMetaProp={this.handleUpdateMetaProp}
                  visForside={context.visForside}
                  visAktiveLag={context.visAktiveLag}
                  onToggleForside={context.onToggleForside}
                  onToggleAktiveLag={context.onToggleAktiveLag}
                />
              </div>
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

export default withStyles(styles)(withRouter(Grunnkart))
