// @flow
import { wgs84ToUtm33, createBboxFromPoint } from './projection'

class Backend {
  static async postFilterPromise(url: string, filter: string) {
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

  static async getPromise(url: string) {
    console.log(url)
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

  static async getTextPromise(url: string) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(result => {
          return result.text()
        })
        .then(text => resolve(text))
        .catch(err => {
          console.error(url, err)
          return {}
        })
    })
  }

  static async getToken() {
    return this.getPromise(`https://www.norgeskart.no/ws/gkt.py`)
  }

  static async searchTaxons(searchStr: string) {
    return new Promise((resolve, reject) => {
      fetch(
        `https://artskart.artsdatabanken.no/appapi/api/data/SearchTaxons?maxCount=15&name=${searchStr}`
      )
        .then(result => result.json())
        .then(json => resolve(json))
    })
  }

  static async søkKode(q: string) {
    return this.getPromise(
      `https://ninmemapi.artsdatabanken.no/v2/Koder?q=${q}`
    )
  }

  static async hentKode(kode: string, bounds: Object) {
    let bbox = ''
    if (bounds) {
      var ll = wgs84ToUtm33(bounds._sw.lng, bounds._sw.lat)
      var ur = wgs84ToUtm33(bounds._ne.lng, bounds._ne.lat)
      bbox = `&bbox=${ll.x},${ll.y},${ur.x},${ur.y}`
    }
    kode = kode || ''

    const url = `https://ninmemapi.artsdatabanken.no/v1/StatKodetre?node=${kode ||
      ''}${bbox}`

    return this.getPromise(url)
  }

  static async hentKodeMeta(path: string) {
    path = path || ''
    return this.getPromise(`https://adb-kode.firebaseio.com/${path}/@.json`)
  }

  static async hentPunkt(lng: number, lat: number) {
    return this.getPromise(
      `https://adb-nin-raster.azurewebsites.net/v1/point/${lng}/${lat}`
    )
  }

  static async hentAdmEnhet(lng: number, lat: number) {
    var bbox = createBboxFromPoint(lng, lat, 0.000001)
    return this.getTextPromise(
      `https://openwms.statkart.no/skwms1/wms.adm_enheter?request=GetFeatureinfo&service=WMS&version=1.3.0&Layers=Kommuner&crs=epsg:4258&format=image/png&width=3&height=3&QUERY_LAYERS=kommuner&i=2&j=2
      &bbox=${bbox.minx},${bbox.miny},${bbox.maxx},${bbox.maxy}`
    )
  }

  static async hentStedsnavn(lng: number, lat: number) {
    return this.getPromise(
      `https://www.norgeskart.no/ws/elev.py?lat=${lat}&lon=${lng}&epsg=4258`
    )
  }

  static async getNatureAreaByLocalId(localId: string) {
    return this.getPromise(
      `https://test.artsdatabanken.no/nin_master/Api/data/GetNatureAreaByLocalId/${localId}`
    )
  }
  static async getMetadataByNatureAreaLocalId(localId: string) {
    return this.getPromise(
      `https://test.artsdatabanken.no/nin_master/Api/data/GetMetadataByNatureAreaLocalId/${localId}`
    )
  }

  static async natureAreaSummary(filter: string) {
    let url = `https://adb-nin-api.azurewebsites.net/api/NatureAreaSummary`
    return this.postFilterPromise(url, filter)
  }

  static async countsByRedlistTheme(filter: string) {
    let url = `https://adb-nin-api.azurewebsites.net/api/CountsByRedlistTheme`
    return this.postFilterPromise(url, filter)
  }

  static async countsByRedlistCategory(filter: string) {
    let url = `https://adb-nin-api.azurewebsites.net/api/CountsByRedlistCategory`
    return this.postFilterPromise(url, filter)
  }

  static async getAreaSummary(filter: string) {
    let url = `https://adb-nin-api.azurewebsites.net/api/AreaSummary`
    return this.postFilterPromise(url, filter)
  }

  static async getNatureAreaSummary(filter: string) {
    //let url = `http://it-webadbtest01.it.ntnu.no/nin_master/Api/data/GetNatureAreaSummary/`;
    let url = `https://adb-nin-api.azurewebsites.net/api/NatureAreaSummary`
    return this.postFilterPromise(url, filter)
  }

  static NatureLevelNames = Object.freeze({
    '0': 'Udefinert',
    '1': 'Landskapstype',
    '2': 'Landskapsdel',
    '3': 'Naturkompleks',
    '4': 'Natursystem',
    '5': 'Naturkomponent',
    '6': 'Livsmedium',
    '7': 'Egenskapsområde',
  })

  static getFotoOmslag(kode: string, width: number = 408) {
    return `https://firebasestorage.googleapis.com/v0/b/grunnkart.appspot.com/o/bilde%2Fomslag%2F${width}%2F${kode}.jpg?alt=media`
  }

  static avatar40px(kode: string) {
    return `https://firebasestorage.googleapis.com/v0/b/grunnkart.appspot.com/o/bilde%2Favatar%2F40%2F${kode}.jpg?alt=media`
  }

  static avatar24px(kode: string) {
    return `https://firebasestorage.googleapis.com/v0/b/grunnkart.appspot.com/o/bilde%2Favatar%2F24%2F${kode}.jpg?alt=media`
  }

  static getFileStorageUrl(path: string) {
    return `https://firebasestorage.googleapis.com/v0/b/grunnkart.appspot.com/o/${encodeURIComponent(
      path
    )}?alt=media`
  }

  static getKodeUtbredelse(kode: string) {
    if (kode) {
      return this.getPromise(
        `https://bboxcode.firebaseio.com/observations/${kode}.json`
      )
    }
  }
}

export default Backend
