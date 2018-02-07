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
      metadata: null,
      factItems: null,
      areaItems: null,
      redlistTheme: null,

      pointInfo: null,
      admEnhet: null,
      stedsnavn: null,
      localId: null,
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
        natureAreaFacts: null,
        natureAreaCodes: null,
        natureAreaDescription: null,
        localId: null,
      })
    else this.goFetchInfo(localId)
  }

  goFetchInfo(id) {
    if (!id) return
    backend.getNatureAreaByLocalId(id).then(data => {
      this.setState({
        natureAreaFacts: this.getNatureAreaFacts(data),
      })
    })
    backend.getMetadataByNatureAreaLocalId(id).then(data =>
      this.setState({
        metadata: data,
      })
    )
  }

  createNatureAreaPointInfo(name, value) {
    return {
      name: name,
      value: value,
      logo:
        'https://pbs.twimg.com/profile_images/378800000067455227/3d053db6b9593d47a02ced7709846522_400x400.png',
      homepage: 'http://www.miljodirektoratet.no/',
      dataorigin: 'MDIR',
      article: 'https://www.artsdatabanken.no/Pages/222921',
    }
  }

  createRødlistePointInfo(name, value) {
    return {
      name: name,
      value: value,
      logo:
        'https://pbs.twimg.com/profile_images/882873307133083648/_1-mmxih_400x400.jpg',
      homepage: 'https://artsdatabanken.no/',
      dataorigin: 'ADB',
      article: 'https://www.artsdatabanken.no/rodlistefornaturtyper',
    }
  }

  getNatureAreaFacts(props) {
    var facts = []
    for (var i in props) {
      switch (i) {
        case 'nivå':
          facts.push(
            this.createNatureAreaPointInfo(
              'Naturnivå',
              backend.NatureLevelNames[props.nivå]
            )
          )
          break
        case 'surveyScale':
          facts.push(
            this.createNatureAreaPointInfo(
              'Kartleggingsmålestokk',
              props.metadata.surveyScale
            )
          )
          break
        case 'surveyedFrom':
          facts.push(
            this.createNatureAreaPointInfo(
              'Kartlagt',
              props.metadata.surveyedFrom
            )
          )
          break
        case 'rødlisteKategori':
          if (props.rødlisteKategori.code === 'LC') break
          facts.push(
            this.createRødlistePointInfo(
              'Rødlistekategori',
              props.rødlisteKategori.code
            )
          )
          if (props.rødlisteKategori.vurderingsenhet) {
            facts.push(
              this.createRødlistePointInfo(
                'Vurderingsenhet',
                props.rødlisteKategori.vurderingsenhet.code
              )
            )
          }
          break
        default:
          break
      }
    }

    for (var y in props.parameters) {
      facts.push(
        this.createNatureAreaPointInfo(
          props.parameters[y].code,
          props.parameters[y].codeDescription
        )
      )
    }

    if (props.description && props.description !== '')
      facts.push(
        this.createNatureAreaPointInfo('Beskrivelse', props.description)
      )

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
        {this.state.natureAreaFacts && (
          <Punktinformasjon
            natureAreaFacts={this.state.natureAreaFacts}
            title="NaturområdeInfo"
          />
        )}
      </div>
    )
  }
}

export default PunktinformasjonContainer
