import { request } from 'graphql-request'
import rename from './rename'
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

  static async getTextPromise(url) {
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
      )
        .then(json => resolve(json))
        .then(json => rename(json))
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

  static Wgs84ToUtm33(x, y) {
    var deg2Rad = Math.PI / 180
    var a = 6378137
    var eccSquared = 0.00669438
    var k0 = 0.9996
    var longOrigin
    var eccPrimeSquared
    var n, T, c, aRenamed, m
    var longTemp = x + 180 - parseInt((x + 180) / 360, 10) * 360 - 180
    var latRad = y * deg2Rad
    var longRad = longTemp * deg2Rad
    var longOriginRad

    var zoneNumber = 33
    //// Handling of "wonky" norwegian zones. Not needed as we pass in zone. Might be nice to hold on to for future reference.
    //var zoneNumber = (int) (longTemp + 180) / 6 + 1;
    //if (y >= 56.0 && y < 64.0 && longTemp >= 3.0 && longTemp < 12.0) zoneNumber = 32;
    //if (y >= 72.0 && y < 84.0)
    //    if (longTemp >= 0.0 && longTemp < 9.0) zoneNumber = 31;
    //    else if (longTemp >= 9.0 && longTemp < 21.0) zoneNumber = 33;
    //    else if (longTemp >= 21.0 && longTemp < 33.0) zoneNumber = 35;
    //    else if (longTemp >= 33.0 && longTemp < 42.0) zoneNumber = 37;

    longOrigin = (zoneNumber - 1) * 6 - 180 + 3
    longOriginRad = longOrigin * deg2Rad
    eccPrimeSquared = eccSquared / (1 - eccSquared)
    n = a / Math.sqrt(1 - eccSquared * Math.sin(latRad) * Math.sin(latRad))
    T = Math.tan(latRad) * Math.tan(latRad)
    c = eccPrimeSquared * Math.cos(latRad) * Math.cos(latRad)
    aRenamed = Math.cos(latRad) * (longRad - longOriginRad)
    m =
      a *
      ((1 -
        eccSquared / 4 -
        3 * eccSquared * eccSquared / 64 -
        5 * eccSquared * eccSquared * eccSquared / 256) *
        latRad -
        (3 * eccSquared / 8 +
          3 * eccSquared * eccSquared / 32 +
          45 * eccSquared * eccSquared * eccSquared / 1024) *
          Math.sin(2 * latRad) +
        (15 * eccSquared * eccSquared / 256 +
          45 * eccSquared * eccSquared * eccSquared / 1024) *
          Math.sin(4 * latRad) -
        35 * eccSquared * eccSquared * eccSquared / 3072 * Math.sin(6 * latRad))
    var utmEasting =
      k0 *
        n *
        (aRenamed +
          (1 - T + c) * aRenamed * aRenamed * aRenamed / 6 +
          (5 - 18 * T + T * T + 72 * c - 58 * eccPrimeSquared) *
            aRenamed *
            aRenamed *
            aRenamed *
            aRenamed *
            aRenamed /
            120) +
      500000.0
    var utmNorthing =
      k0 *
      (m +
        n *
          Math.tan(latRad) *
          (aRenamed * aRenamed / 2 +
            (5 - T + 9 * c + 4 * c * c) *
              aRenamed *
              aRenamed *
              aRenamed *
              aRenamed /
              24 +
            (61 - 58 * T + T * T + 600 * c - 330 * eccPrimeSquared) *
              aRenamed *
              aRenamed *
              aRenamed *
              aRenamed *
              aRenamed *
              aRenamed /
              720))
    if (y < 0) utmNorthing += 10000000.0
    return { x: utmEasting, y: utmNorthing }
  }

  static async søkKode(q) {
    return this.getPromise(
      `https://adb-nin-memapi.azurewebsites.net/v1/Koder?q=${q}`
    )
  }
  static async hentKode(kode, bounds) {
    let bbox = ''
    if (bounds) {
      var ll = this.Wgs84ToUtm33(bounds._sw.lng, bounds._sw.lat)
      var ur = this.Wgs84ToUtm33(bounds._ne.lng, bounds._ne.lat)
      bbox = `&bbox=${ll.x},${ll.y},${ur.x},${ur.y}`
    }
    return this.getPromise(
      `https://adb-nin-memapi.azurewebsites.net/v1/Kodetre?node=${kode}${bbox}`
    )
  }

  static async hentKodeMeta(kode) {
    return this.getPromise(`https://adb-kode.firebaseio.com/data/${kode}.json`)
  }

  static async hentRasterPunkt(lng, lat) {
    return this.getPromise(
      `https://adb-nin-raster.azurewebsites.net/v1/point/${lng}/${lat}`
    )
  }

  static CreateBboxFromPoint(lng, lat, radius) {
    return {
      minx: lat - radius,
      miny: lng - radius,
      maxx: Number.parseFloat(lat) + Number.parseFloat(radius),
      maxy: Number.parseFloat(lng) + Number.parseFloat(radius),
    }
  }

  static async hentAdmEnhet(lng, lat) {
    var bbox = this.CreateBboxFromPoint(lng, lat, 0.000001)
    return this.getTextPromise(
      `https://openwms.statkart.no/skwms1/wms.adm_enheter?request=GetFeatureinfo&service=WMS&version=1.3.0&Layers=Kommuner&crs=epsg:4258&format=image/png&width=3&height=3&QUERY_LAYERS=kommuner&i=2&j=2
      &bbox=${bbox.minx},${bbox.miny},${bbox.maxx},${bbox.maxy}`
    )
  }

  static async hentStedsnavn(lng, lat) {
    return this.getPromise(
      `https://www.norgeskart.no/ws/elev.py?lat=${lat}&lon=${lng}&epsg=4258`
    )
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

  static getKodeFotoUrl(kode, small) {
    const smallFolder = '40'
    const largeFolder = '408'
    if (kode)
      return `https://firebasestorage.googleapis.com/v0/b/grunnkart.appspot.com/o/cover%2F${
        small ? smallFolder : largeFolder
      }%2F${kode}.jpg?alt=media`
  }

  static getKodeUtbredelseUrl(kode) {
    if (kode) {
      return `https://firebasestorage.googleapis.com/v0/b/grunnkart.appspot.com/o/utbredelse%2F${kode}.png?alt=media`
    }
  }

}

export default Backend
