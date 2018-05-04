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
    //console.log(url)
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

  static async søkKode(q: string) {
    return this.getPromise(
      `https://ninmemapi.artsdatabanken.no/v2/Koder?q=${q}`
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

  // static async getNatureAreaByLocalId(localId: string) {
  //   return this.getPromise(
  //     `https://test.artsdatabanken.no/nin_master/Api/data/GetNatureAreaByLocalId/${localId}`
  //   )
  // }
  static async getMetadataByNatureAreaLocalId(localId: string) {
    return this.getPromise(
      `https://bboxcode.firebaseio.com/metadata/${localId}.json`
      // `https://test.artsdatabanken.no/nin_master/Api/data/GetMetadataByNatureAreaLocalId/${localId}`
    )
  }
  static async getCodeTitle(code: string) {
    return this.getPromise(
      `https://bboxcode.firebaseio.com/titles/${code.toUpperCase()}.json`
    )
  }

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

  // TODO: Pek på assets
  static getCompanyLogo(navn: string) {
    navn = navn || 'MDIR'
    navn = navn.toLowerCase()
    switch (navn) {
      case 'mdir':
        return 'https://pbs.twimg.com/profile_images/378800000067455227/3d053db6b9593d47a02ced7709846522_400x400.png'
      case 'adb':
        return 'https://pbs.twimg.com/profile_images/882873307133083648/_1-mmxih_400x400.jpg'
      case 'biofokus':
        return 'https://www.artsdatabanken.no/Media/F7355'
      default:
        return `https://firebasestorage.googleapis.com/v0/b/grunnkart.appspot.com/o/bilde%2Favatar%2F40%2F${navn}.jpg?alt=media`
    }
  }

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
