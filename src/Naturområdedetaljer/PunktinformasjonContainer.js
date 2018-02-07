import React, { Component } from 'react'
import backend from '../backend'
import Punktinformasjon from './Punktinformasjon'
//import Naturomradeinformasjon from './Naturområdeinformasjon'
//import { ListItem } from 'material-ui'

class PunktinformasjonContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // filter:
      natureAreaIds: [],
      redlistThemeIds: [],

      // api-received data
      natureAreaFacts: null,
      natureAreaCodes: null,
      natureAreaDescription: null,
      metadata: '',
      factItems: [],
      areaItems: '',
      redlistTheme: '',

      pointInfo: {},
      admEnhet: '',
      stedsnavn: null,
      localId: '',
    }
  }

  componentWillReceiveProps(props) {
    this.fetch(props.lng, props.lat, props.localId)
  }
  componentDidMount() {
    this.fetch(this.props.lng, this.props.lat, this.props.localId)
  }

  fetch(lng, lat, localId) {
    this.setState({
      lngLat: {
        Lat: { value: Number.parseFloat(lat).toPrecision(7) },
        Lon: { value: Number.parseFloat(lng).toPrecision(7) },
      },
      localId: localId,
    })

    this.goFetchPointInfo(lng, lat)

    if (localId === 'null')
      this.setState({
        natureArea: '',
        localId: '',
      })
    else this.goFetchInfo(localId)
  }

  goFetchInfo(id) {
    if (!id) return
    backend.getNatureAreaByLocalId(id).then(data => {
      this.setState({
        natureAreaFacts: this.getNatureAreaFacts(data),
      })
      this.setState({
        natureAreaCodes: this.getNatureAreaCodes(data),
      })
      this.setState({
        natureAreaDescription: this.getNatureAreaDescription(data),
      })
    })
    backend.getMetadataByNatureAreaLocalId(id).then(data =>
      this.setState({
        metadata: data,
      })
    )
  }

  getNatureAreaDescription(props) {
    if (props && props.description && props.description !== '')
      return [
        {
          name: 'Beskrivelse',
          value: props.description,
        },
      ]
  }

  getNatureAreaCodes(props) {
    var codes = []
    if (!props) return null
    for (var i in props.parameters) {
      codes.push({
        name: props.parameters[i].code,
        value: props.parameters[i].codeDescription,
      })
    }
    return codes
  }

  getNatureAreaFacts(props) {
    var facts = []
    for (var i in props) {
      switch (i) {
        case 'nivå':
          facts.push({
            name: 'Naturnivå',
            value: backend.NatureLevelNames[props.nivå],
          })
          break
        case 'surveyScale':
          facts.push({
            name: 'Kartleggingsmålestokk',
            value: props.metadata.surveyScale,
          })
          break
        case 'surveyedFrom':
          facts.push({
            name: 'Kartlagt',
            value: props.metadata.surveyedFrom,
          })
          break
        case 'rødlisteKategori':
          facts.push({
            name: 'Rødlistekategori',
            value: props.rødlisteKategori.code,
          })
          if (props.rødlisteKategori.vurderingsenhet) {
            facts.push({
              name: 'Vurderingsenhet',
              value: props.rødlisteKategori.vurderingsenhet.code,
            })
          }
          break
        default:
          break
      }
    }
    return facts
  }

  fixAdmEnhet(data) {
    if (!data.match(/fylkesnavn = '(.*)'/)) return null
    const fylkesnavn = data.match(/fylkesnavn = '(.*)'/)[1]
    const fylkeskode = 'GEO_FY-' + data.match(/fylkesnummer = '(.*)'/)[1]
    const kommunenavn = data.match(/navn_norsk = '(.*)'/)[1]
    const kommunekode = 'GEO_KO-' + data.match(/kommunenummer = '(.*)'/)[1]
    return {
      [kommunekode]: {
        value: kommunenavn,
        name: 'Kommune',
        dataorigin: 'Kartverket',
        homepage: 'https://kartverket.no/',
        logo: 'https://www.kartverket.no/Content/Images/logo-graphic-512.png',
      },
      [fylkeskode]: {
        value: fylkesnavn,
        name: 'Fylke',
        dataorigin: 'Kartverket',
        homepage: 'https://kartverket.no/',
        logo: 'https://www.kartverket.no/Content/Images/logo-graphic-512.png',
      },
    }
  }

  fixStedsnavn(data) {
    if (data.placename)
      return {
        ['GEO_SN-' + data.stedsnummer]: {
          name: 'Stedsnavn',
          value: data.placename,
          dataorigin: 'Kartverket',
          homepage: 'https://kartverket.no/',
          logo: 'https://www.kartverket.no/Content/Images/logo-graphic-512.png',
        },
      }
    return null
  }

  goFetchPointInfo(lng, lat) {
    backend.hentRasterPunkt(lng, lat).then(data => {
      this.setState({
        pointInfo: data,
      })
    })
    backend.hentAdmEnhet(lng, lat).then(data =>
      this.setState({
        admEnhet: this.fixAdmEnhet(data),
      })
    )
    backend.hentStedsnavn(lng, lat).then(data =>
      this.setState({
        stedsnavn: this.fixStedsnavn(data),
      })
    )
  }

  render() {
    return (
      <div style={{ maxHeight: window.innerHeight * 0.8, overflow: 'auto' }}>
        <Punktinformasjon
          metadata={this.state.metadata}
          pointInfo={this.state.pointInfo}
          admEnhet={this.state.admEnhet}
          stedsnavn={this.state.stedsnavn}
          lngLat={this.state.lngLat}
          title="PunktInfo"
        />
        <Punktinformasjon
          natureAreaFacts={this.state.natureAreaFacts}
          natureAreaCodes={this.state.natureAreaCodes}
          natureAreaDescription={this.state.natureAreaDescription}
          title="NaturområdeInfo"
        />
      </div>
    )
  }
}

export default PunktinformasjonContainer
