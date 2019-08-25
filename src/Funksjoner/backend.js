import { wgs84ToUtm33 } from "Funksjoner/projection";
import config from "Funksjoner/config";

class Backend {
  static async getPromise(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(result => {
          if (result && result.status === 200) {
            return result.json();
          }
        })
        .then(json => resolve(json))
        .catch(err => {
          console.error(url, err);
          return {};
        });
    });
  }

  static async søk(q) {
    return this.getPromise(`https://lookup.artsdatabanken.no/${q}`);
  }

  static async hentStatistikk(kode, bounds) {
    var ll = wgs84ToUtm33(bounds._southWest.lng, bounds._southWest.lat);
    var ur = wgs84ToUtm33(bounds._northEast.lng, bounds._northEast.lat);
    let bbox = `&bbox=${ll.x},${ll.y},${ur.x},${ur.y}`;

    const url = `https://ogapi.artsdatabanken.no/v1/StatKodetre?node=${kode}${bbox}`;
    return this.getPromise(url);
  }

  static async hentKodeMeta(path) {
    return this.getPromise(config.metaUrl(path));
  }

  static async hentPunkt(lng, lat) {
    return this.getPromise(`https://punkt.artsdatabanken.no/${lng},${lat}`);
  }

  /* DEN GAMLE INNTIL VIDERE */
  static async hentPunktGammel(lng, lat) {
    return this.getPromise(
      `https://vector.artsdatabanken.no/ogapi/codes/${lng}/${lat}`
    );
  }
  /* SLUTT  */

  static async hentStedsnavn(lng, lat) {
    return this.getPromise(`https://stedsnavn.artsdatabanken.no/${lng},${lat}`);
  }

  static async hentKildedata(id) {
    return this.getPromise(
      `${config.storageUrl}Natur_i_Norge/Natursystem/metadata/${id}.json`
    );
  }
}

export default Backend;
