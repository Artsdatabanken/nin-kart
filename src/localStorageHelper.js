import Color from 'color'

class LocalStorageHelper {
  static getFargeKode(kode, meta) {
    var customColors = undefined
    if (window.localStorage) {
      customColors = localStorage.getItem('customColors')
    }

    let defaultFarge = Color(meta && meta.farge ? meta.farge : '#888888').alpha(
      0.7
    )
    if (customColors) {
      let fargeElement = JSON.parse(customColors).filter(
        x => x.kode.toLowerCase() === kode.toLowerCase()
      )
      return fargeElement && fargeElement[0] && fargeElement[0].farge
        ? fargeElement[0].farge
        : defaultFarge
    }
    return defaultFarge
  }
}

export default LocalStorageHelper
