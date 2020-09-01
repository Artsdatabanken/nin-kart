const host = window.location.hostname;
const isTest = host.indexOf("test") >= 0 || host === "localhost";

class config {
  static feature = {
    comboSøk: false
  };

  static domain = isTest ? "test.artsdatabanken.no" : "artsdatabanken.no";
  static dataHost = "data." + config.domain;
  static dataUrl = "https://" + this.dataHost;
  static storageUrl = "https://" + config.domain;

  static createTileSource(relativePath, type, zoom, bbox) {
    const url = new URL(relativePath);
    url.host = this.dataHost;
    const source = {
      filtering: "nearest",
      type: type,
      url: url.toString() + "/{z}/{x}/{y}"
    };
    if (!bbox || !zoom) {
      console.warn(`No map extents for ${relativePath}`);
    }

    if (bbox) {
      const [ll, ur] = bbox;
      source.bounds = ll[0]
        ? [ll[1], ll[0], ur[1], ur[0]]
        : [-180, -81.05195, 179, 81.05195];
    }
    if (zoom) {
      source.max_zoom = zoom[1];
    }
    return source;
  }

  static foto(url, width = 408, filtype = "jpg") {
    if (
      url.indexOf("Datakilde") === 0 ||
      url.indexOf("Administrativ_grense") === 0
    )
      filtype = "png";
    return `${config.dataUrl}${url}/foto_${width}.${filtype}`;
  }

  static getFotoBanner(url, width = 408) {
    return `${config.dataUrl}${url}/banner_${width}.jpg`;
  }

  static phylopic(url) {
    return `${config.dataUrl}${url}/phylopic_48.png`;
  }

  static logo(url, width = 24) {
    return `${config.dataUrl}${url}/logo_${width}.png`;
  }

  static metaUrl(url) {
    return `${config.dataUrl}${url}/metadata.json`;
  }

  static hack(kode) {
    // TODO: Erstatt denne med kode.split("-").pop()
    if (
      kode.indexOf("AO-TO-FL") === 0 ||
      kode.indexOf("VV") === 0 ||
      kode.indexOf("NN-NA-BS-3EL") === 0 ||
      kode.indexOf("NN-NA-LKM-BK") === 0 ||
      kode.indexOf("NN-NA-") === 0
    )
      return kode.split("-").pop();
    if (kode.indexOf("NN-") !== 0) return kode;
    return kode.substring(3);
  }
}

export default config;
