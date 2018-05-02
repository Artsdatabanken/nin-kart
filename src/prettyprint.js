class PrettyPrint {
  static prettyPrintAreal(areal) {
    if (!areal) return ''
    if (areal < 1000) return Number(areal).toFixed(0) + ' m²'
    areal /= 1000
    if (areal < 1000) return Number(areal).toFixed(0) + ' km²'
    return Number(areal / 1000).toFixed(0) + "' km²"
  }
}

export default PrettyPrint
