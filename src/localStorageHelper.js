class LocalStorageHelper {
  static overrideFarger(meta) {
    if (!meta.barn) meta.barn = {}
    if (!window.localStorage) return
    const customString = localStorage.getItem('customColors')
    if (!customString) return
    const customColors = JSON.parse(customString)
    const table = customColors.reduce((all, c) => {
      all[c.kode] = c.farge
      return all
    }, {})
    Object.keys(meta.barn).forEach(kode => {
      if (kode in table) meta.barn[kode].farge = table[kode]
    })
    if (meta.kode in table) meta.farge = table[meta.kode]
  }

  static settFargeKode(kode, farge) {
    let farger = JSON.parse(localStorage.getItem('customColors') || '[]')
    farger = farger.filter(x => x.kode !== kode)
    farger.push({ kode: kode, farge: farge })
    localStorage.setItem('customColors', JSON.stringify(farger))
  }
}

export default LocalStorageHelper
