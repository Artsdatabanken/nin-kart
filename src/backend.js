import { request } from 'graphql-request'

class Backend {
  static async postFilterPromise(url, filter) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filter),
      })
        .then(result => result.json())
        .then(json => resolve(json))
    })
  }

  static async getPromise(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(result => {
          return result.json()
        })
        .then(json => resolve(json))
        .catch(err => {
          console.error(url, err)
          return {}
        })
    })
  }

  static async getToken() {
    return this.getPromise(`https://www.norgeskart.no/ws/gkt.py`)
  }

  static async loadTaxonTree(taxonId) {
    const taxonTreeQuery = `
        query treeNodes($ids: [Int]!) {
            taxonTreeNodes(taxonIds: $ids) {
            id
            #count
            popularName
            scientificName
            scientificNameAuthor
            parentId
            children {
              id
            #count
              aggreggatedCount
            #parentId
              scientificName
            #scientificNameAuthor
              popularName
            }
          }
        }`
    const variables = {
      ids: [taxonId],
    }

    return new Promise((resolve, reject) => {
      request(
        '//ogapi.artsdatabanken.no/graph',
        //"https://adb-og-api.azurewebsites.net/graph",
        taxonTreeQuery,
        variables
      ).then(json => resolve(json))
    })
  }

  static async searchTaxons(searchStr) {
    return new Promise((resolve, reject) => {
      fetch(
        `https://artskart.artsdatabanken.no/appapi/api/data/SearchTaxons?maxCount=15&name=${searchStr}`
      )
        .then(result => result.json())
        .then(json => resolve(json))
    })
  }

  static async hentKode(kode) {
    return this.getPromise(
      `https://adb-nin-memapi.azurewebsites.net/v1/Kodetre?node=${kode}`
    )
  }

  static async søkKode(q) {
    return this.getPromise(
      `https://adb-nin-memapi.azurewebsites.net/v1/Koder?q=${q}`
    )
  }

  static async hentKodeInfo(kode) {
    let kortKode = kode
    if (kode && kode.indexOf('_') > 0) {
      kortKode = kode.substr(kode.indexOf('_') + 1)
    }
    return this.getPromise(
      `http://data.beta.artsdatabanken.no/api/Graph/NiN2.0/${kortKode}`
    )
  }

  static async hentKodeMeta(kode) {
    return this.getPromise(`/kode/${kode}.json`)
  }

  static async getNatureAreaByLocalId(localId) {
    return this.getPromise(
      `http://it-webadbtest01.it.ntnu.no/nin_master/Api/data/GetNatureAreaByLocalId/${localId}`
    )
  }
  static async getMetadataByNatureAreaLocalId(localId) {
    return this.getPromise(
      `http://it-webadbtest01.it.ntnu.no/nin_master/Api/data/GetMetadataByNatureAreaLocalId/${localId}`
    )
  }

  static async natureAreaSummary(filter) {
    let url = `https://adb-nin-api.azurewebsites.net/api/NatureAreaSummary`
    return this.postFilterPromise(url, filter)
  }

  static async countsByRedlistTheme(filter) {
    let url = `https://adb-nin-api.azurewebsites.net/api/CountsByRedlistTheme`
    return this.postFilterPromise(url, filter)
  }

  static async countsByRedlistCategory(filter) {
    let url = `https://adb-nin-api.azurewebsites.net/api/CountsByRedlistCategory`
    return this.postFilterPromise(url, filter)
  }

  static async getAreaSummary(filter) {
    let url = `https://adb-nin-api.azurewebsites.net/api/AreaSummary`
    return this.postFilterPromise(url, filter)
  }

  static async getNatureAreaSummary(filter) {
    //let url = `http://it-webadbtest01.it.ntnu.no/nin_master/Api/data/GetNatureAreaSummary/`;
    let url = `https://adb-nin-api.azurewebsites.net/api/NatureAreaSummary`
    return this.postFilterPromise(url, filter)
  }

  static NatureLevelNames = Object.freeze({
    0: 'Udefinert',
    1: 'Landskapstype',
    2: 'Landskapsdel',
    3: 'Naturkompleks',
    4: 'Natursystem',
    5: 'Naturkomponent',
    6: 'Livsmedium',
    7: 'Egenskapsområde',
  })
}

export default Backend
