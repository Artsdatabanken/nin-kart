import React, { Component } from 'react'
import backend from '../backend'
import Punktinformasjon from './Punktinformasjon'
import VektorPunktinformasjon from './VektorPunktinformasjon'

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
      verneomrade: null,

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
    else if (localId !== this.state.localId) this.goFetchInfo(localId)
  }

  goFetchInfo(id) {
    this.setState({
      natureAreaFacts: null,
    })
    if (!id) return
    backend.getMetadataByNatureAreaLocalId(id).then(metadata => {
      this.getNatureAreaFacts(metadata)
    })
  }

  createNatureAreaPointInfo(name, value, part) {
    var natureAreaPointInfo = {
      name: name,
      value: value,
      logo: backend.getCompanyLogo('MDIR'),
      homepage: 'http://www.miljodirektoratet.no/',
      dataorigin: 'MDIR',
      part: part,
    }

    //if (!useDefaultArticle) return natureAreaPointInfo

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
          this.AddTitleToFacts(
            {
              description: backend.NatureLevelNames[props.nivå],
            },
            'NA',
            true
          )
          break
        case 'surveyer':
        case 'owner':
          this.AddTitleToFacts(
            {
              description: props[i].company + ', ' + props[i].contactPerson,
              url: props[i].homesite
                ? props[i].homesite
                : 'mailto:' + props[i].email,
              company: props[i].company,
            },
            this.MetadataDictionary[i]
          )
          break
        case 'program':
        case 'project':
          if (props[i].name) {
            this.AddTitleToFacts(
              {
                description: props[i].description
                  ? props[i].name + ', ' + props[i].description
                  : props[i].name,
                url: '',
                company: props.owner ? props.owner.company : '',
              },
              this.MetadataDictionary[i]
            )
          }
          break
        case 'surveyedFrom':
        case 'surveyScale':
          this.AddTitleToFacts(
            {
              description: props.surveyedFrom
                ? props.surveyedFrom
                : props.surveyScale,
            },
            this.MetadataDictionary[i],
            true
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
      backend
        .getCodeTitle(code)
        .then(result =>
          this.AddTitleToFacts(
            { description: result, part: props.codes[code].andel },
            code,
            true
          )
        )
      let param = props.codes[code]
      if (Array.isArray(param.beskrivelsesvariabler)) {
        for (let a in param.beskrivelsesvariabler) {
          let bv = 'BS_' + param.beskrivelsesvariabler[a]
          backend
            .getCodeTitle(bv)
            .then(result =>
              this.AddTitleToFacts(
                { description: result, parentCode: code },
                bv
              )
            )
        }
      } else if (param.beskrivelsesvariabler) {
        let bv1 = 'BS_' + param.beskrivelsesvariabler
        backend
          .getCodeTitle(bv1)
          .then(result =>
            this.AddTitleToFacts({ description: result, parentCode: code }, bv1)
          )
      }
    }

    if (props.description && props.description !== '')
      facts.Beskrivelse = this.createNatureAreaPointInfo(
        'Beskrivelse',
        props.description
      )
  }

  AddTitleToFacts(value, code, natureInfo = false) {
    if (!value.description) return
    let facts = {}
    let title = ''
    let key = code
    if (value.description.parent) {
      code = value.description.parent
    }

    if (value.description.title) title = value.description.title
    else title = value.description

    if (this.state.natureAreaFacts) facts = this.state.natureAreaFacts
    if (natureInfo) {
      facts[key] = this.createNatureAreaPointInfo(code, title, value.part)
    } else {
      if (value.parentCode) {
        if (!facts[value.parentCode]) facts[value.parentCode] = {}
        if (!facts[value.parentCode].codes) facts[value.parentCode].codes = {}
        facts[value.parentCode].codes[key] = this.createPointInfo(
          code,
          title,
          value.url,
          value.company
        )
      } else
        facts[key] = this.createPointInfo(code, title, value.url, value.company)
    }
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

  fixVerneområde(data) {
    let extractedData = {}
    var parseString = require('xml2js').parseString
    parseString(data, function(err, result) {
      if (!result.FeatureInfoResponse.FIELDS) return
      let fields = result.FeatureInfoResponse.FIELDS[0].$
      let id = parseInt(fields.IID.substring(2), 10)
      extractedData = {
        ['VV_' + id]: {
          name: 'Verneområde',
          value: fields.Omradenavn,
          dataorigin: 'MDIR',
          homepage: 'http://www.miljodirektoratet.no/',
          logo:
            'https://pbs.twimg.com/profile_images/378800000067455227/3d053db6b9593d47a02ced7709846522_400x400.png',
          article: 'http://faktaark.naturbase.no/?id=' + fields.IID
        },
      }
    })
    return extractedData
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
    backend.hentVerneområde(lng, lat).then(data =>
      this.setState({
        verneomrade: this.fixVerneområde(data),
      })
    )
  }

  render() {
    return (
      <div style={{ maxHeight: window.innerHeight * 0.8, overflow: 'auto' }}>
        {this.state.natureAreaFacts && (
          <VektorPunktinformasjon
            key="NA"
            natureAreaFacts={this.state.natureAreaFacts}
            title="NaturområdeInfo"
          />
        )}
        <Punktinformasjon
          key="AD"
          metadata={this.state.metadata}
          pointInfo={this.state.pointInfo}
          admEnhet={this.state.admEnhet}
          stedsnavn={this.state.stedsnavn}
          verneomrade={this.state.verneomrade}
          lngLat={this.state.lngLat}
          title="PunktInfo"
        />
      </div>
    )
  }
}

export default PunktinformasjonContainer
