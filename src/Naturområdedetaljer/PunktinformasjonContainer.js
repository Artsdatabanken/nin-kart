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

  MetadataDictionary = {
    surveyer: 'Kartlegger, Kontaktperson',
    owner: 'Dataeier, kontaktperson',
    program: 'Program',
    project: 'Prosjekt',
    nivå: 'Natursystem',
    surveyedFrom: 'Kartlagt',
    surveyScale: 'Kartleggingsmålestokk',
    rødlisteKategori: 'RødlisteKategori',
  }

  getNatureAreaFacts(props) {
    var facts = {}
    for (var i in props) {
      switch (i) {
        case 'nivå':
          facts.NA = this.createNatureAreaPointInfo(
            this.MetadataDictionary[i],
            backend.NatureLevelNames[props.nivå]
          )
          break
        case 'surveyer':
          facts.Surveyer = this.createPointInfo(
            this.MetadataDictionary[i],
            props[i].contactPerson + ', ' + props[i].company,
            'mailto:' + props[i].email,
            props[i].company
          )
          break
        case 'owner':
          facts.Owner = this.createPointInfo(
            this.MetadataDictionary[i],
            props[i].company + ', ' + props[i].contactPerson,
            props[i].homesite ? props[i].homesite : 'mailto:' + props[i].email,
            props[i].company
          )
          break
        case 'program':
          facts.Program = this.createPointInfo(
            this.MetadataDictionary[i],
            props[i].name,
            '',
            props.owner ? props.owner.company : ''
          )
          break
        case 'project':
          if (props[i].name) {
            facts.Project = this.createPointInfo(
              this.MetadataDictionary[i],
              props[i].name + ', ' + props[i].description,
              '',
              props.owner ? props.owner.company : ''
            )
          }
          break
        case 'surveyedFrom':
        case 'surveyScale':
          facts.Kartlagt = this.createNatureAreaPointInfo(
            this.MetadataDictionary[i],
            props[i],
            '',
            props.owner ? props.owner.company : ''
          )
          break
        case 'rødlisteKategori':
          if (props[i].code === 'LC') break
          let key = 'RL_' + props[i].code
          facts[key] = this.createRødlistePointInfo(
            this.MetadataDictionary[i],
            props[i].code
          )
          if (props[i].vurderingsenhet) {
            facts.Vurderingsenhet = this.createRødlistePointInfo(
              'Vurderingsenhet',
              props[i].vurderingsenhet.code
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
            .then(result => this.AddTitleToFacts(result, bv))
        }
      } else if (param.beskrivelsesvariabler) {
        let bv1 = 'BS_' + param.beskrivelsesvariabler
        backend
          .getCodeTitle(bv1)
          .then(result => this.AddTitleToFacts(result, bv1))
      }
      backend
        .getCodeTitle(code)
        .then(result => this.AddTitleToFacts(result, code, true))
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

  AddTitleToFacts(result, bv, natureInfo = false, useDefaultArticle = true) {
    let facts = {}
    if (this.state.natureAreaFacts) facts = this.state.natureAreaFacts
    if (natureInfo)
      facts[bv] = this.createNatureAreaPointInfo(bv, result, useDefaultArticle)
    else facts[bv] = this.createPointInfo(bv, result)
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
