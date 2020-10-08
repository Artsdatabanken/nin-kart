class PrettyPrint {
  static prettyPrintAreal(areal) {
    if (!areal) return "";
    if (areal < 100000) return Number(areal).toFixed(0) + " m²";
    areal /= 1e6;
    if (areal < 100) return Number(areal).toFixed(1) + " km²";
    if (areal < 10000) return Number(areal).toFixed(0) + " km²";
    return Number(areal / 1000).toFixed(1) + "' km²";
  }

  static prettyPrintDistance(dist) {
    if (!dist) return "";
    if (dist < 10000) return Number(dist).toFixed(0) + " m";
    dist /= 1e3;
    if (dist < 100) return Number(dist).toFixed(1) + " km";
    if (dist < 10000) return Number(dist).toFixed(0) + " km";
    return Number(dist / 1000).toFixed(1) + "' km";
  }
}

export default PrettyPrint;
