function roundToX(num, x) {
  const factor = Math.pow(10, x);
  return Math.round(num * factor) / factor;
}

const getKoordinatStreng = (koordinat) =>
  roundToX(koordinat[0], 5) + "° N " + roundToX(koordinat[1], 5) + "° Ø";

export { getKoordinatStreng };
