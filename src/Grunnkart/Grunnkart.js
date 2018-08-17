// @flow
import typesystem from '@artsdatabanken/typesystem'
import React from 'react'
import { withRouter } from 'react-router'
import backend from '../backend'
import Kart from '../Kart'
import språk from '../språk'
import VenstreVinduContainer from '../VenstreVinduContainer'
import MainDrawer from './MainDrawer'

type State = {
  aktiveLag: Array<Object>,
  showMainDrawer: boolean,
  meta: Object,
  fitBounds: Object,
  actualBounds: Object,
  opplystKode: string,
}

type Props = {
  location: Object,
  history: Object,
}

const standardLag = [
  {
    farge: '#fc61fd',
    kode: 'AO_50',
    tittel: 'Trøndelag',
    barn: {
      'AO_50-01': {
        farge: '#f49943',
        sti: 'ao/50/01',
        tittel: 'Trondheim',
      },
      'AO_50-04': {
        farge: '#f4c543',
        sti: 'ao/50/04',
        tittel: 'Steinkjer',
      },
    },
    erSynlig: true,
    kanSlettes: true,
  },
  {
    kode: 'bakgrunnskart',
    tittel: 'Bakgrunnskart',
    erSynlig: true,
    transport: true,
    vann: true,
    vannvei: true,
    kommunegrense: true,
    fylkesgrense: true,
    landegrense: false,
  },
  {
    kode: 'terreng',
    tittel: '3D terreng',
    erSynlig: false,
    vertikaltOverdriv: 2.0,
    visKontur: true,
    visEtikettTopp: true,
    konturintervall: 100.0,
    visEtikettKontur: true,
  },
]
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
      aktiveLag: standardLag,
      showMainDrawer: false,
      opplystKode: '',
    }
    //    this.redirectTo(props.location.pathname.replace('/katalog/', ''))
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

  addSelected = props => {
    let koder = this.state.aktiveLag
    koder.push({
      farge: props.farge,
      kode: props.kode,
      tittel: språk(props.tittel),
      barn: props.barn,
      erSynlig: true,
      kanSlettes: true,
    })

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
      Object.keys(data.barn).forEach(
        kode => (data.barn[kode].sti = this.kodeTilRelativUrl(kode))
      )
      this.setState({ meta: data })
    })
  }

  handleRemoveSelectedLayer = kode => {
    let aktive = this.state.aktiveLag
    for (let i = 0; i < aktive.length; i++)
      if (aktive[i].kode === kode) {
        aktive.splice(i, 1)
        break
      }
    this.setState({
      aktiveLag: aktive,
    })
    this.props.history.push('/')
  }

  handleUpdateLayerProp = (kode, key, value) => {
    const aktive = this.state.aktiveLag
    const aktivt = aktive.find(x => x.kode === kode)
    aktivt[key] = value
    this.setState({ aktiveLag: [...aktive] })
  }

  render() {
    let erAktivert = false
    if (this.state.meta)
      erAktivert = !!this.state.aktiveLag.find(
        vk => vk.kode === this.state.meta.kode
      )
    return (
      <div>
        <Kart
          bounds={this.state.fitBounds}
          latitude={65.4}
          longitude={10.8}
          zoom={3}
          pitch={0}
          bearing={0}
          aktiveLag={this.state.aktiveLag}
          meta={this.state.meta}
          opplystKode={this.state.opplystKode}
          onMapBoundsChange={this.handleActualBoundsChange}
        />

        <MainDrawer
          open={this.state.showMainDrawer}
          onToggleMainDrawer={() =>
            this.setState({ showMainDrawer: !this.state.showMainDrawer })
          }
        />

        {!this.state.showMainDrawer && (
          <VenstreVinduContainer
            aktiveLag={this.state.aktiveLag}
            onToggleMainDrawer={() =>
              this.setState({
                showMainDrawer: !this.state.showMainDrawer,
              })
            }
            mapBounds={this.state.actualBounds}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            onFitBounds={this.handleFitBounds}
            erAktivert={erAktivert}
            onToggleLayer={this.handleToggleLayer}
            onRemoveSelectedLayer={this.handleRemoveSelectedLayer}
            onExitToRoot={() => this.props.history.replace('/')}
            meta={this.state.meta || {}}
            onUpdateLayerProp={this.handleUpdateLayerProp}
          />
        )}
      </div>
    )
  }

  handleMouseEnter = kode => {
    console.log('enter', kode)
    this.setState({ opplystKode: kode })
  }

  handleMouseLeave = kode => {
    console.log('leave', kode)
    this.setState({ opplystKode: '' })
  }
}

export default withRouter(Grunnkart)
