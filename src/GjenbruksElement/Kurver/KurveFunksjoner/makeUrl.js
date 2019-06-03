export default function makeUrl(punkt, gradient) {
  // TODO:
  if (!punkt) return `https://romlig.artsdatabanken.no/${gradient.url}`;
  return `https://romlig.artsdatabanken.no/statistikk/grid1d?punkter=${
    punkt.url
  }&raster=${gradient.url}`;
}
