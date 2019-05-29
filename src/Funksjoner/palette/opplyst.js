import tinycolor from "tinycolor2";

function opplyst(url, opplystUrl, farge) {
  if (!opplystUrl) return farge;
  const f = tinycolor(farge);

  if (url.startsWith(opplystUrl))
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
