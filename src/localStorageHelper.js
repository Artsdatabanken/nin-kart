class LocalStorageHelper {
  static getFargeKode(kode, meta) {
    var customColors = undefined
    customColors = localStorage.getItem('customColors')

  static settFargeKode(kode, farge) {
    let farger = JSON.parse(localStorage.getItem('customColors') || '[]')
    farger = farger.filter(x => x.kode !== kode)
    farger.push({ kode: kode, farge: farge })
    localStorage.setItem('customColors', JSON.stringify(farger))
  }
}

export default LocalStorageHelper
