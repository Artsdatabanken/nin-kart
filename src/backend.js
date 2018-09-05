// @flow
import { createBboxFromPoint, wgs84ToUtm33 } from './projection'

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
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(result => {
          if (result && result.status === 200) {
            return result.json()
          }
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

  static async søkKode(q: string) {
    return this.getPromise(
      `https://test.artsdatabanken.no/ogapi/v2/Koder?q=${q}`
    )
  }

  static async hentKode(kode: string, bounds: Object) {
    let bbox = ''
    if (bounds) {
      var ll = wgs84ToUtm33(bounds._southWest.lng, bounds._southWest.lat)
      var ur = wgs84ToUtm33(bounds._northEast.lng, bounds._northEast.lat)
      bbox = `&bbox=${ll.x},${ll.y},${ur.x},${ur.y}`
    }
    kode = kode || ''

    const url = `https://test.artsdatabanken.no/ogapi/v1/StatKodetre?node=${kode ||
      ''}${bbox}`

    return this.getPromise(url)
  }

  static async hentKodeMeta(path: string) {
    path = path || ''
    return this.getPromise(`https://adb-kode.firebaseio.com/${path}/@.json`)
  }

  static async hentPunkt(lng: number, lat: number) {
    return this.getPromise(
      `https://vector.artsdatabanken.no/ogapi/codes/${lng}/${lat}`
    )
  }

  static async createGetFeatureInfoCall(
    wmsUri: string,
    lng: Number,
    lat: Number,
    layers: Object,
    infoFormat: string = 'text/plain'
  ) {
    var bbox = createBboxFromPoint(lng, lat, 0.000001)
    return this.getTextPromise(
      wmsUri +
        `?request=GetFeatureinfo&service=WMS&version=1.3.0&Layers=${layers}&crs=epsg:4258&format=image/png&width=3&height=3&QUERY_LAYERS=${layers}&i=2&j=2&bbox=${
          bbox.minx
        },${bbox.miny},${bbox.maxx},${bbox.maxy}&INFO_FORMAT=${infoFormat}`
    )
  }

  static async hentStedsnavn(lng: number, lat: number) {
    return this.getPromise(
      `https://www.norgeskart.no/ws/elev.py?lat=${lat}&lon=${lng}&epsg=4258`
    )
  }

  static async getMetadataByNatureAreaLocalId(localId: string) {
    return this.getPromise(
      `https://test.artsdatabanken.no/data/json/ninMetadata/${localId.toUpperCase()}.json`
    )
  }
  // static async getCodeTitle(code: string) {
  //   return this.getPromise(
  //     `https://bboxcode.firebaseio.com/titles/${code.toUpperCase()}.json`
  //   )
  // }

  static async getImageAttribution(kode: string) {
    return {
      license: {
        name: 'CC BY-SA 3.0',
        url: 'https://creativecommons.org/licenses/by-sa/3.0/deed.en',
      },
      attribution: {
        name: 'Wikipedia',
        url: 'https://no.wikipedia.org/wiki/Portal:Forside',
      },
    }
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

  static getFotoBanner(kode: string, width: number = 408) {
    return `https://firebasestorage.googleapis.com/v0/b/grunnkart.appspot.com/o/bilde%2Fbanner%2F${width}%2F${kode}.jpg?alt=media`
  }

  static avatar40px(kode: string, ext = 'jpg') {
    return `https://firebasestorage.googleapis.com/v0/b/grunnkart.appspot.com/o/bilde%2Favatar%2F40%2F${kode}.${ext}?alt=media`
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
        `https://test.artsdatabanken.no/data/json/observationsGroup/${kode}.json`
      )
    }
  }

  static debounce(func, wait, immediate) {
    var timeout
    return function() {
      var context = this,
        args = arguments
      var later = function() {
        timeout = null
        if (!immediate) func.apply(context, args)
      }
      var callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func.apply(context, args)
    }
  }
}

export default Backend
