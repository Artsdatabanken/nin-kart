import tinycolor from "tinycolor2";

function opplyst(kode, opplystKode, farge) {
  if (!opplystKode) return farge;
  const f = tinycolor(farge);
  if (kode === opplystKode)
    return f
      .saturate(10)
      .darken(20)
      .toHslString();
  return f
    .desaturate(40)
    .lighten(10)
    .toHslString();
}

export default opplyst;
