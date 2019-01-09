import tinycolor from "tinycolor2";

function opplyst(kode, opplystKode, farge) {
  if (!opplystKode) return farge;
  const f = tinycolor(farge);
  if (kode === opplystKode) return f.saturate(50).toHslString();
  return f.desaturate(90).toHslString();
}

export default opplyst;
