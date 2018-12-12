const storageUrl = 'https://maps.artsdatabanken.no/'

class config {
  static feature = {
    comboSøk: false,
  }

  static createTileSource(relativePath, type, zoom, bbox) {
    const source = {
      filtering: 'nearest',
      type: type,
      url: `https://{s}.artsdatabanken.no/${relativePath}.mbtiles/{z}/{x}/{y}`,
      url_subdomains: ['maps'],
    }
    if (!bbox || !zoom) {
      console.warn(`No map extents for ${relativePath}`)
    }

    if (bbox) {
      const [ll, ur] = bbox
      source.bounds = [ll[1], ll[0], ur[1], ur[0]]
    }
    if (zoom) {
      source.max_zoom = zoom[1]
    }
    return source
  }

  static getFotoOmslag(
    kode: string,
    width: number = 408,
    filtype: string = 'jpg'
  ) {
    return `${storageUrl}bilde%2Fomslag%2F${width}%2F${kode}.${filtype}`
  }

  static getFotoBanner(kode: string, width: number = 408) {
    return `${storageUrl}bilde%2Fbanner%2F${width}%2F${kode}.jpg`
  }

  static avatar40px(kode: string, ext = 'jpg') {
    return `${storageUrl}bilde%2Favatar%2F40%2F${kode}.${ext}`
  }

  static metaUrl(kode: string) {
    kode = kode.replace('/katalog/', '').toUpperCase()
    if (kode.length <= 1) kode = '~'
    return `https://maps.artsdatabanken.no/metabase.sqlite/meta/${kode}.json`
  }
}

export default config
