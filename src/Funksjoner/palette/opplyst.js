import tinycolor from "tinycolor2";

function opplyst(url, opplystUrl, farge) {
  const f = tinycolor(farge);

  if (!opplystUrl) return f;

  if (url.startsWith(opplystUrl)) return f;
  //      .saturate(10)
  //      .darken(20)
  return (
    f
      //  .desaturate(40)
      .lighten(10)
  );
}

export default opplyst;
