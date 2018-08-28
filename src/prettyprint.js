class PrettyPrint {
  static prettyPrintAreal(areal) {
    if (!areal) return ''
    if (areal < 2000) return Number(areal).toFixed(0) + ' m²'
    areal /= 1e6
    if (areal < 10000) return Number(areal).toFixed(0) + ' km²'
    return Number(areal / 1000).toFixed(0) + "' km²"
  }
}

export default PrettyPrint
