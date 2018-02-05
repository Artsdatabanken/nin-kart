import React, { Component } from 'react'
import backend from '../backend'
import Punktinformasjon from './Punktinformasjon'

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
      admEnhetInfo: '',
      stedsnavn: null,
    }
  }

  componentDidMount() {
    this.goFetch(this.props.natureAreaId)
    const lngLat = this.props.lngLat.split(',')
    console.log(lngLat)
    this.goFetchPointInfo(lngLat)
    this.setState({
      lngLat: {
        Lat: { value: Number.parseFloat(lngLat[1]).toPrecision(7) },
        Lon: { value: Number.parseFloat(lngLat[0]).toPrecision(7) },
      },
    })
    this.goFetchInfo(this.props.localId)
  }

  goFetchInfo(id) {
    if (!id) return
    backend.getNatureAreaByLocalId(id).then(data => {
      this.setState({
        natureArea: data,
        localId: '',
      })
    })
    backend.getMetadataByNatureAreaLocalId(id).then(data =>
      this.setState({
        metadata: data,
        localId: '',
      })
    )
  }

  goFetch(id) {
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
    return {
      Fylkesnavn: {
        value: data.match(/fylkesnavn = '(.*)'/)[1],
      },
      Fylkesnummer: {
        value: data.match(/fylkesnummer = '(.*)'/)[1],
      },
      Kommunenavn: {
        value: data.match(/navn_norsk = '(.*)'/)[1],
      },
      Kommunenummer: {
        value: data.match(/kommunenummer = '(.*)'/)[1],
      },
    }
  }

  fixStedsnavn(data) {
    if (data.placename)
      return {
        Stedsnavn: {
          value: data.placename,
        },
      }
    return null
  }

  goFetchPointInfo(lngLat) {
    backend.hentRasterPunkt(lngLat).then(data =>
      this.setState({
        pointInfo: data,
      })
    )
    backend.hentAdmEnhet(lngLat).then(data =>
      this.setState({
        admEnhetInfo: this.fixAdmEnhet(data),
      })
    )
    backend.hentStedsnavn(lngLat).then(data =>
      this.setState({
        stedsnavn: this.fixStedsnavn(data),
      })
    )
  }

  render() {
    return (
      <Punktinformasjon
        natureArea={this.state.natureArea}
        metadata={this.state.metadata}
        pointInfo={this.state.pointInfo}
        admEnhetInfo={this.state.admEnhetInfo}
        stedsnavn={this.state.stedsnavn}
      />
    )
  }
}

export default PunktinformasjonContainer
