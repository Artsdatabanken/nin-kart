import React, { Component } from 'react'
import backend from '../backend'
import Punktinformasjon from './Punktinformasjon'
import Naturomradeinformasjon from './Naturområdeinformasjon'
//import { ListItem } from 'material-ui'

class PunktinformasjonContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // filter:
      natureAreaIds: [],
      redlistThemeIds: [],

      // api-received data
      natureArea: '',
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
        natureArea: data,
      })
    })
    backend.getMetadataByNatureAreaLocalId(id).then(data =>
      this.setState({
        metadata: data,
      })
    )
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
        logo:
          'https://www.kartverket.no/ImageVault/publishedmedia/sbmee5jt1ys7ky0huw32/Kartverket_staende.jpg',
      },
      [fylkeskode]: {
        value: fylkesnavn,
        name: 'Fylke',
        dataorigin: 'Kartverket',
        homepage: 'https://kartverket.no/',
        logo:
          'https://www.kartverket.no/ImageVault/publishedmedia/sbmee5jt1ys7ky0huw32/Kartverket_staende.jpg',
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
          logo:
            'https://www.kartverket.no/ImageVault/publishedmedia/sbmee5jt1ys7ky0huw32/Kartverket_staende.jpg',
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
      <div>
        <Punktinformasjon
          metadata={this.state.metadata}
          pointInfo={this.state.pointInfo}
          admEnhet={this.state.admEnhet}
          stedsnavn={this.state.stedsnavn}
          lngLat={this.state.lngLat}
          title="PunktInfo"
        />
        <Naturomradeinformasjon
          natureArea={this.state.natureArea}
          title="NaturområdeInfo"
        />
      </div>
    )
  }
}

export default PunktinformasjonContainer
