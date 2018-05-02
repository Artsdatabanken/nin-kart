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

    if (!localId)
      this.setState({
        natureAreaFacts: null,
        localId: null,
      })
    else this.goFetchInfo(localId)
  }

  goFetchInfo(id) {
    if (!id) return
    backend.getMetadataByNatureAreaLocalId(id).then(metadata => {
      this.getNatureAreaFacts(metadata)
    })
  }

  createNatureAreaPointInfo(name, value, useDefaultArticle = true) {
    var natureAreaPointInfo = {
      name: name,
      value: value,
      logo: backend.getCompanyLogo('MDIR'),
      homepage: 'http://www.miljodirektoratet.no/',
      dataorigin: 'MDIR',
    }

    if (!useDefaultArticle) return natureAreaPointInfo

    var codeSplit = name.split('_')

    if (codeSplit.length === 1)
      natureAreaPointInfo.article = 'https://www.artsdatabanken.no/Pages/222921'
    else
      natureAreaPointInfo.article =
        'https://www.artsdatabanken.no/NiN2.0/' + codeSplit[1]

    return natureAreaPointInfo
  }

  createRødlistePointInfo(name, value) {
    return {
      name: name,
      value: value,
      logo: backend.getCompanyLogo('ADB'),
      homepage: 'https://artsdatabanken.no/',
      dataorigin: 'ADB',
      article: 'https://www.artsdatabanken.no/rodlistefornaturtyper',
    }
  }
  createPointInfo(name, value, url, company) {
    var pointInfo = {
      name: name,
      value: value,
      logo: backend.getCompanyLogo(company),
      homepage: url || 'http://www.miljodirektoratet.no/',
      dataorigin: company,
    }

    return pointInfo
  }

  getNatureAreaFacts(props) {
    var facts = {}
    for (var i in props) {
      switch (i) {
        case 'nivå':
          facts.NA = this.createNatureAreaPointInfo(
            'Natursystem',
            backend.NatureLevelNames[props.nivå]
          )

          break
        case 'surveyer':
          if (props.surveyer)
            facts.Surveyer = this.createPointInfo(
              'Kartlegger, Kontaktperson',
              props.surveyer.contactPerson + ', ' + props.surveyer.company,
              'mailto:' + props.surveyer.email,
              props.surveyer.company
            )
          break
        case 'owner':
          if (props.owner) {
            facts.Owner = this.createPointInfo(
              'Dataeier, kontaktperson',
              props.owner.company + ', ' + props.owner.contactPerson,
              props.owner.homesite
                ? props.owner.homesite
                : 'mailto:' + props.owner.email,
              props.owner.company
            )
          }
          break
        case 'program':
          if (props.program) {
            facts.Program = this.createPointInfo(
              'Program',
              props.program.name,
              '',
              props.owner ? props.owner.company : ''
            )
          }
          break
        case 'project':
          if (props.projectName) {
            facts.Project = this.createPointInfo(
              'Prosjekt',
              props.project.name + ', ' + props.project.description,
              '',
              props.owner ? props.owner.company : ''
            )
          }
          break
        case 'surveyedFrom':
          if (props.surveyedFrom) {
            facts.Kartlagt = this.createNatureAreaPointInfo(
              'Kartlagt',
              props.surveyedFrom,
              '',
              props.owner ? props.owner.company : ''
            )
          }
          break
        case 'surveyScale':
          if (props.surveyScale) {
            facts.Kartleggingsmålestokk = this.createNatureAreaPointInfo(
              'Kartleggingsmålestokk',
              props.surveyScale,
              '',
              props.owner ? props.owner.company : ''
            )
          }
          break
        case 'rødlisteKategori':
          if (props.rødlisteKategori.code === 'LC') break
          facts[
            'RL_' + props.rødlisteKategori.code
          ] = this.createRødlistePointInfo(
            'Rødlistekategori',
            props.rødlisteKategori.code
          )
          if (props.rødlisteKategori.vurderingsenhet) {
            facts.Vurderingsenhet = this.createRødlistePointInfo(
              'Vurderingsenhet',
              props.rødlisteKategori.vurderingsenhet.code
            )
          }
          break
        default:
          break
      }
    }

    for (let code in props.codes) {
      let param = props.codes[code]
      if (Array.isArray(param.beskrivelsesvariabler)) {
        for (let a in param.beskrivelsesvariabler) {
          let bv = 'BS_' + param.beskrivelsesvariabler[a]
          backend
            .getCodeTitle(bv)
            .then(result => this.AddCodeTitleToFacts(result, bv))
        }
      } else if (param.beskrivelsesvariabler) {
        let bv1 = 'BS_' + param.beskrivelsesvariabler
        backend
          .getCodeTitle(bv1)
          .then(result => this.AddCodeTitleToFacts(result, bv1))
      }
      backend
        .getCodeTitle(code)
        .then(result => this.AddNatureareaCodeTitleToFacts(result, code))
    }

    if (props.description && props.description !== '')
      facts.Beskrivelse = this.createNatureAreaPointInfo(
        'Beskrivelse',
        props.description,
        false
      )

    this.setState({
      natureAreaFacts: facts,
    })
  }

  AddCodeTitleToFacts(result, bv) {
    let facts = this.state.natureAreaFacts
    facts[bv] = this.createPointInfo(bv, result)
    this.setState({
      natureAreaFacts: facts,
    })
  }

  AddNatureareaCodeTitleToFacts(result, bv, useDefaultArticle = true) {
    let facts = this.state.natureAreaFacts
    facts[bv] = this.createNatureAreaPointInfo(bv, result, useDefaultArticle)
    this.setState({
      natureAreaFacts: facts,
    })
  }

  fixAdmEnhet(data) {
    if (!data.match(/fylkesnavn = '(.*)'/)) return null
    const fylkesnavn = data.match(/fylkesnavn = '(.*)'/)[1]
    const fylkeskode = 'AO-' + data.match(/fylkesnummer = '(.*)'/)[1]
    const kommunenavn = data.match(/navn_norsk = '(.*)'/)[1]
    const kommunekode =
      fylkeskode + '-' + data.match(/kommunenummer = '[0-9]{2}(.*)'/)[1]
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
  fixData(data) {
    var namespaceData = {}
    for (var code in data) {
      var newCode = data[code].namespace
        ? data[code].namespace + '_' + code
        : code
      namespaceData[newCode] = data[code]
    }
    return namespaceData
  }

  goFetchPointInfo(lng, lat) {
    backend.hentPunkt(lng, lat).then(data => {
      this.setState({
        pointInfo: this.fixData(data),
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
          key="AD"
          metadata={this.state.metadata}
          pointInfo={this.state.pointInfo}
          admEnhet={this.state.admEnhet}
          stedsnavn={this.state.stedsnavn}
          lngLat={this.state.lngLat}
          title="PunktInfo"
        />
        {this.state.natureAreaFacts && (
          <Punktinformasjon
            key="NA"
            natureAreaFacts={this.state.natureAreaFacts}
            title="NaturområdeInfo"
          />
        )}
      </div>
    )
  }
}

export default PunktinformasjonContainer
