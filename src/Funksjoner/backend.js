import config from "Funksjoner/config";

class Backend {
  static async getPromise(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((result) => {
          if (result && result.status === 200) {
            return result.json();
          }
        })
        .then((json) => resolve(json))
        .catch((err) => {
          console.error(url, err);
          return {};
        });
    });
  }

  static async søk(q) {
    return this.getPromise(`https://lookup.${config.domain}/v1/query?q=${q}`);
  }

  static async hentKodeMeta(path) {
    return this.getPromise(config.metaUrl(path));
  }

  static async hentPunkt(lng, lat) {
    return this.getPromise(
      `https://punkt.${config.domain}/v1/punkt?lng=${lng}&lat=${lat}`
    );
  }

  static async hentPunktVektor(lng, lat) {
    return this.getPromise(
      `https://punkt.${config.domain}/v1/punktvektor?lng=${lng}&lat=${lat}`
    );
  }

  static async hentStedsnavn(lng, lat) {
    return this.getPromise(
      `https://stedsnavn.${config.domain}/v1/punkt?lng=${lng}&lat=${lat}`
    );
  }

  static async hentKildedata(id) {
    return this.getPromise(
      `${config.storageUrl}Natur_i_Norge/Natursystem/metadata/${id}.json`
    );
  }
}

export default Backend;
