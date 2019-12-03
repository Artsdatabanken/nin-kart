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
    return this.getPromise(`https://lookup.artsdatabanken.no/v1/query?q=${q}`);
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
    return this.getPromise(
      `https://punkt.artsdatabanken.no/v1/punkt?lng=${lng}&lat=${lat}`
    );
  }

  /* DEN GAMLE INNTIL VIDERE */
  static async hentPunktGammel(lng, lat) {
    return this.getPromise(
      `https://vector.artsdatabanken.no/ogapi/codes/${lng}/${lat}`
    );
  }
  /* SLUTT  */

  static async hentStedsnavn(lng, lat) {
    return this.getPromise(
      `https://stedsnavn.artsdatabanken.no/v1/punkt?lng=${lng}&lat=${lat}`
    );
  }

  static async hentKildedata(id) {
    return this.getPromise(
      `${config.storageUrl}Natur_i_Norge/Natursystem/metadata/${id}.json`
    );
  }

  static async wmsFeatureInfo(url, lat, lng) {
    // https://ahocevar.com/geoserver/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=ne%3Ane&LAYERS=ne%3Ane&INFO_FORMAT=text%2Fhtml&I=67&J=192&WIDTH=256&HEIGHT=256&CRS=EPSG%3A3857&STYLES=&BBOX=0%2C0%2C20037508.342789244%2C20037508.342789244

    const url1 = `https://gis3.nve.no/map/services/VerneplanforVassdrag/MapServer/WmsServer?service=WMS&request=GetFeatureInfo&QUERY_LAYERS=VerneplanforVassdrag&styles=&format=image%2Fpng&transparent=true&version=1.1.1&width=256&height=256&srs=EPSG%3A4326&bbox=${lng -
      0.0001},${lat - 0.0001},${lng + 0.0001},${lat + 0.0001}`;
    // https://ahocevar.com/geoserver/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=ne%3Ane&LAYERS=ne%3Ane&INFO_FORMAT=text%2Fhtml&I=67&J=192&WIDTH=256&HEIGHT=256&CRS=EPSG%3A3857&STYLES=&BBOX=0%2C0%2C20037508.342789244%2C20037508.342789244
    return new Promise((resolve, reject) => {
      fetch(url1)
        .then(result => {
          if (result && result.status === 200) {
            resolve(result.text());
          }
        })
        .catch(err => {
          console.error(url, err);
          reject();
        });
    });
  }
}
export default Backend;
