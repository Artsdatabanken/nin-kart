const storageUrl = "https://maps.artsdatabanken.no/";

class config {
  static feature = {
    comboSøk: false
  };

  static createTileSource(relativePath, type, zoom, bbox) {
    const source = {
      filtering: "nearest",
      type: type,
      url: `https://{s}.artsdatabanken.no/${relativePath}.mbtiles/{z}/{x}/{y}`,
      url_subdomains: ["maps"]
    };
    if (!bbox || !zoom) {
      console.warn(`No map extents for ${relativePath}`);
    }

    if (bbox) {
      const [ll, ur] = bbox;
      source.bounds = [ll[1], ll[0], ur[1], ur[0]];
    }
    if (zoom) {
      source.max_zoom = zoom[1];
    }
    return source;
  }

  static getFotoOmslag(
    url: string,
    width: number = 408,
    filtype: string = "jpg"
  ) {
    return `${storageUrl}${url}/forside_${width}.${filtype}`;
  }

  static getFotoBanner(url: string, width: number = 408) {
    return `${storageUrl}${url}/banner_${width}.jpg`;
  }

  static avatar40px(url: string, ext = "jpg") {
    return `${storageUrl}${url}/avatar_40.${ext}`;
  }

  static metaUrl(url: string) {
    return `${storageUrl}${url}/metadata.json`;
  }

  static hackUrl(url) {
    return url.replace(/[/:\s]/g, "_"); // TODO: Bruk metabasen i APIet
  }
}

export default config;
