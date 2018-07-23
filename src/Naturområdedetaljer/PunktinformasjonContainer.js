import React, { Component } from 'react'
import xml2js from 'xml2js'
import backend from '../backend'
import Punktinformasjon from './Punktinformasjon'
import VektorPunktinformasjon from './VektorPunktinformasjon'

let oldLonLat = []

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
    this.mounted = true
    this.fetch(this.props.lng, this.props.lat, this.props.localId)
  }

  componentWillUnmount() {
    this.mounted = false
  }

  TrySetState(newState) {
    if (this.mounted) this.setState(newState)
  }

  fetch(lng, lat, localId) {
    this.TrySetState({
      lngLat: {
        Lat: { value: Number.parseFloat(lat).toPrecision(7) },
        Lon: { value: Number.parseFloat(lng).toPrecision(7) },
      },
      localId: localId,
    })

    if (
      Number.parseFloat(lng).toPrecision(7) !== oldLonLat[0] &&
      Number.parseFloat(lat).toPrecision(7) !== oldLonLat[1]
    ) {
      this.goFetchPointInfo(lng, lat)
      oldLonLat = [
        Number.parseFloat(lng).toPrecision(7),
        Number.parseFloat(lat).toPrecision(7),
      ]
    }

    if (!localId)
      this.TrySetState({
        natureAreaFacts: null,
        localId: null,
      })
    else if (localId !== this.state.localId) this.goFetchInfo(localId)
  }

  goFetchInfo(id) {
    this.TrySetState({ natureAreaFacts: null, metadata: null })
    if (!id) return
    backend.getMetadataByNatureAreaLocalId(id).then(metadata => {
      this.getNatureAreaFacts(metadata, id)
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
    surveyer: 'Kartlegger',
    owner: 'Dataeier',
    program: 'Program',
    project: 'Prosjekt',
    nivå: 'Natursystem',
    surveyedFrom: 'Kartlagt',
    surveyScale: 'Kartleggingsmålestokk',
    rødlisteKategori: 'RødlisteKategori',
  }

  getNatureAreaFacts(props, id) {
    if (!props) return

    var facts = {
      LokalId: {
        value: id,
        name: 'Naturområde',
        logo: backend.getCompanyLogo('MDIR'),
        homepage: 'http://www.miljodirektoratet.no/',
        dataorigin: 'MDIR',
        // url: props[i].homesite ? props[i].homesite : 'mailto:' + props[i].email,
        // name: this.MetadataDictionary[i],
      },
    }
    for (var i in props) {
      switch (i) {
        case 'nivå':
          break
        case 'surveyer':
        case 'owner':
          let value = 'Ukjent'
          if (props[i].company !== null && props[i].contactPerson !== null) {
            value = props[i].company + ', ' + props[i].contactPerson
          }
          facts[this.MetadataDictionary[i]] = {
            value: value,
            logo: backend.getCompanyLogo('MDIR'),
            homepage: 'http://www.miljodirektoratet.no/',
            dataorigin: 'MDIR',
            url: props[i].homesite
              ? props[i].homesite
              : 'mailto:' + props[i].email,
            name: this.MetadataDictionary[i],
          }
          break
        case 'program':
        case 'project':
          if (props[i].name) {
            facts[this.MetadataDictionary[i]] = {
              value: props[i].description
                ? props[i].name + ', ' + props[i].description
                : props[i].name,
              logo: backend.getCompanyLogo('MDIR'),
              homepage: 'http://www.miljodirektoratet.no/',
              dataorigin: 'MDIR',
              url: '',
              name: this.MetadataDictionary[i],
            }
          }
          break
        case 'surveyedFrom':
        case 'surveyScale':
          facts[this.MetadataDictionary[i]] = {
            value: props.surveyedFrom ? props.surveyedFrom : props.surveyScale,
            name: this.MetadataDictionary[i],
            logo: backend.getCompanyLogo('MDIR'),
            homepage: 'http://www.miljodirektoratet.no/',
            dataorigin: 'MDIR',
          }

          break
        case 'rødlisteKategori':
          break
        default:
          break
      }
    }

    for (let code in props.codes) {
      let param = props.codes[code]

      facts[code] = this.createNatureAreaPointInfo(
        code,
        param.tittel,
        param.andel
      )
      if (!param.beskrivelsesvariabler) continue
      if (!Array.isArray(param.beskrivelsesvariabler)) {
        param.beskrivelsesvariabler = [param.beskrivelsesvariabler]
      }
      for (let value in param.beskrivelsesvariabler) {
        let beskrivelsesvariabel = param.beskrivelsesvariabler[value]
        let keyName = Object.keys(beskrivelsesvariabel)[0]
        beskrivelsesvariabel = beskrivelsesvariabel[keyName]
        if (beskrivelsesvariabel.forfader) {
          if (!facts[code].codes) facts[code].codes = {}
          facts[code].codes[keyName] = {
            value: beskrivelsesvariabel.tittel,
            name: beskrivelsesvariabel.forfader,
          }
        }
      }
    }

    if (props.description && props.description !== '')
      facts.Beskrivelse = this.createNatureAreaPointInfo(
        'Beskrivelse',
        props.description
      )

    this.TrySetState({
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
    var parseString = xml2js.parseString
    parseString(data, function(err, result) {
      if (!result.FeatureInfoResponse.FIELDS) return
      let fields = result.FeatureInfoResponse.FIELDS[0].$
      let id = parseInt(fields.naturvernId.substring(2), 10)
      extractedData = {
        ['VV_' + id]: {
          name: 'Verneområde',
          value: fields.navn,
          dataorigin: 'MDIR',
          homepage: 'http://www.miljodirektoratet.no/',
          logo:
            'https://pbs.twimg.com/profile_images/378800000067455227/3d053db6b9593d47a02ced7709846522_400x400.png',
          article: fields.faktaark,
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
    this.TrySetState({
      pointInfo: null,
      admEnhet: null,
      stedsnavn: null,
      verneomrade: null,
    })
    backend.hentPunkt(lng, lat).then(data => {
      this.TrySetState({
        pointInfo: this.fixData(data),
      })
    })
    backend.hentAdmEnhet(lng, lat).then(data => {
      this.TrySetState({
        admEnhet: this.fixAdmEnhet(data),
      })
    })
    backend.hentStedsnavn(lng, lat).then(data => {
      this.TrySetState({
        stedsnavn: this.fixStedsnavn(data),
      })
    })
    backend.hentVerneområde(lng, lat).then(data => {
      this.TrySetState({
        verneomrade: this.fixVerneområde(data),
      })
    })
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
