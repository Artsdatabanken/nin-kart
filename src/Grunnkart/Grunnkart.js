// @flow
import React from 'react'
import { withRouter } from 'react-router'
import backend from '../backend'
import Kart from '../Kart'
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
    tittel: { nb: 'Trøndelag' },
    barn: {
      'AO_50-01': {
        farge: '#f49943',
        sti: 'ao/50/01',
        tittel: { nb: 'Trondheim' },
      },
      'AO_50-04': {
        farge: '#f4c543',
        sti: 'ao/50/04',
        tittel: { nb: 'Steinkjer' },
      },
      'AO_50-05': {
        farge: '#f4f243',
        sti: 'ao/50/05',
        tittel: { nb: 'Namsos' },
      },
      'AO_50-11': {
        farge: '#caf443',
        sti: 'ao/50/11',
        tittel: { nb: 'Hemne' },
      },
      'AO_50-12': {
        farge: '#9ef443',
        sti: 'ao/50/12',
        tittel: { nb: 'Snillfjord' },
      },
      'AO_50-13': {
        farge: '#72f443',
        sti: 'ao/50/13',
        tittel: { nb: 'Hitra' },
      },
      'AO_50-14': {
        farge: '#45f443',
        sti: 'ao/50/14',
        tittel: { nb: 'Frøya' },
      },
      'AO_50-15': {
        farge: '#43f46d',
        sti: 'ao/50/15',
        tittel: { nb: 'Ørland' },
      },
      'AO_50-16': {
        farge: '#43f499',
        sti: 'ao/50/16',
        tittel: { nb: 'Agdenes' },
      },
      'AO_50-17': {
        farge: '#43f4c5',
        sti: 'ao/50/17',
        tittel: { nb: 'Bjugn' },
      },
      'AO_50-18': {
        farge: '#43f4f2',
        sti: 'ao/50/18',
        tittel: { nb: 'Åfjord' },
      },
      'AO_50-19': { farge: '#43caf4', sti: 'ao/50/19', tittel: { nb: 'Roan' } },
      'AO_50-20': { farge: '#439ef4', sti: 'ao/50/20', tittel: { nb: 'Osen' } },
      'AO_50-21': {
        farge: '#4372f4',
        sti: 'ao/50/21',
        tittel: { nb: 'Oppdal' },
      },
      'AO_50-22': {
        farge: '#4345f4',
        sti: 'ao/50/22',
        tittel: { nb: 'Rennebu' },
      },
      'AO_50-23': {
        farge: '#6d43f4',
        sti: 'ao/50/23',
        tittel: { nb: 'Meldal' },
      },
      'AO_50-24': {
        farge: '#9943f4',
        sti: 'ao/50/24',
        tittel: { nb: 'Orkdal' },
      },
      'AO_50-25': {
        farge: '#c543f4',
        sti: 'ao/50/25',
        tittel: { nb: 'Røros' },
      },
      'AO_50-26': {
        farge: '#f243f4',
        sti: 'ao/50/26',
        tittel: { nb: 'Holtålen' },
      },
      'AO_50-27': {
        farge: '#f443ca',
        sti: 'ao/50/27',
        tittel: { nb: 'Midtre Gauldal' },
      },
      'AO_50-28': {
        farge: '#f4439e',
        sti: 'ao/50/28',
        tittel: { nb: 'Melhus' },
      },
      'AO_50-29': {
        farge: '#f44372',
        sti: 'ao/50/29',
        tittel: { nb: 'Skaun' },
      },
      'AO_50-30': {
        farge: '#f44345',
        sti: 'ao/50/30',
        tittel: { nb: 'Klæbu' },
      },
      'AO_50-31': {
        farge: '#f46d43',
        sti: 'ao/50/31',
        tittel: { nb: 'Malvik' },
      },
      'AO_50-32': {
        farge: '#f49943',
        sti: 'ao/50/32',
        tittel: { nb: 'Selbu' },
      },
      'AO_50-33': {
        farge: '#f4c543',
        sti: 'ao/50/33',
        tittel: { nb: 'Tydal' },
      },
      'AO_50-34': {
        farge: '#f4f243',
        sti: 'ao/50/34',
        tittel: { nb: 'Meråker' },
      },
      'AO_50-35': {
        farge: '#caf443',
        sti: 'ao/50/35',
        tittel: { nb: 'Stjørdal' },
      },
      'AO_50-36': {
        farge: '#9ef443',
        sti: 'ao/50/36',
        tittel: { nb: 'Frosta' },
      },
      'AO_50-37': {
        farge: '#72f443',
        sti: 'ao/50/37',
        tittel: { nb: 'Levanger' },
      },
      'AO_50-38': {
        farge: '#45f443',
        sti: 'ao/50/38',
        tittel: { nb: 'Verdal' },
      },
      'AO_50-39': {
        farge: '#43f46d',
        sti: 'ao/50/39',
        tittel: { nb: 'Verran' },
      },
      'AO_50-40': {
        farge: '#43f499',
        sti: 'ao/50/40',
        tittel: { nb: 'Namdalseid' },
      },
      'AO_50-41': {
        farge: '#43f4c5',
        sti: 'ao/50/41',
        tittel: { nb: 'Snåsa' },
      },
      'AO_50-42': {
        farge: '#43f4f2',
        sti: 'ao/50/42',
        tittel: { nb: 'Lierne' },
      },
      'AO_50-43': {
        farge: '#43caf4',
        sti: 'ao/50/43',
        tittel: { nb: 'Røyrvik' },
      },
      'AO_50-44': {
        farge: '#439ef4',
        sti: 'ao/50/44',
        tittel: { nb: 'Namsskogan' },
      },
      'AO_50-45': {
        farge: '#4372f4',
        sti: 'ao/50/45',
        tittel: { nb: 'Grong' },
      },
      'AO_50-46': {
        farge: '#4345f4',
        sti: 'ao/50/46',
        tittel: { nb: 'Høylandet' },
      },
      'AO_50-47': {
        farge: '#6d43f4',
        sti: 'ao/50/47',
        tittel: { nb: 'Overhalla' },
      },
      'AO_50-48': {
        farge: '#9943f4',
        sti: 'ao/50/48',
        tittel: { nb: 'Fosnes' },
      },
      'AO_50-49': {
        farge: '#c543f4',
        sti: 'ao/50/49',
        tittel: { nb: 'Flatanger' },
      },
      'AO_50-50': {
        farge: '#f243f4',
        sti: 'ao/50/50',
        tittel: { nb: 'Vikna' },
      },
      'AO_50-51': {
        farge: '#f443ca',
        sti: 'ao/50/51',
        tittel: { nb: 'Nærøy' },
      },
      'AO_50-52': { farge: '#f4439e', sti: 'ao/50/52', tittel: { nb: 'Leka' } },
      'AO_50-53': {
        farge: '#f44372',
        sti: 'ao/50/53',
        tittel: { nb: 'Inderøy' },
      },
      'AO_50-54': {
        farge: '#f44345',
        sti: 'ao/50/54',
        tittel: { nb: 'Indre Fosen' },
      },
    },
    erSynlig: true,
    kanSlettes: true,
  },
  {
    kode: 'bakgrunnskart',
    tittel: { nb: 'Bakgrunnskart' },
    erSynlig: true,
    kommunegrense: true,
    fylkesgrense: true,
    landegrense: false,
  },
  {
    kode: 'terreng',
    tittel: { nb: '3D terreng' },
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
      tittel: props.tittel,
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
            meta={this.state.meta || {}}
            onUpdateLayerProp={this.handleUpdateLayerProp}
          />
        )}
      </div>
    )
  }
}

export default withRouter(Grunnkart)
