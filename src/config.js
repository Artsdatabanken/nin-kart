const storageUrl =
  'https://firebasestorage.googleapis.com/v0/b/grunnkart.appspot.com/o/'

class config {
  static getFotoOmslag(
    kode: string,
    width: number = 408,
    filtype: string = 'jpg'
  ) {
    return `${storageUrl}bilde%2Fomslag%2F${width}%2F${kode}.${filtype}?alt=media`
  }

  static getFotoBanner(kode: string, width: number = 408) {
    return `${storageUrl}bilde%2Fbanner%2F${width}%2F${kode}.jpg?alt=media`
  }

  static avatar40px(kode: string, ext = 'jpg') {
    return `${storageUrl}bilde%2Favatar%2F40%2F${kode}.${ext}?alt=media`
  }

  static avatar24px(kode: string) {
    return `${storageUrl}bilde%2Favatar%2F24%2F${kode}.jpg?alt=media`
  }
}

export default config
