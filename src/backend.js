// @flow
import { wgs84ToUtm33 } from './projection'
import config from './config'

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

  static async søkKode(q: string) {
    return this.getPromise(
      `https://test.artsdatabanken.no/ogapi/v2/Koder?q=${q}`
    )
  }

  static async hentStatistikk(kode: String, bounds: Object) {
    var ll = wgs84ToUtm33(bounds._southWest.lng, bounds._southWest.lat)
    var ur = wgs84ToUtm33(bounds._northEast.lng, bounds._northEast.lat)
    let bbox = `&bbox=${ll.x},${ll.y},${ur.x},${ur.y}`

    const url = `https://test.artsdatabanken.no/ogapi/v1/StatKodetre?node=${kode}${bbox}`
    return this.getPromise(url)
  }

  static async hentKodeMeta(path: string) {
    path = path || '~'
    return this.getPromise(config.metaUrl(path))
  }

  static async hentPunkt(lng: number, lat: number) {
    return this.getPromise(
      `https://vector.artsdatabanken.no/ogapi/codes/${lng}/${lat}`
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
}

export default Backend
