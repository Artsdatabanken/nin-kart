import sysconfig from "Funksjoner/config";

export default function lagSource({ url, zoom }, { bbox }) {
  return sysconfig.createTileSource(url, "Raster", zoom, bbox);
}
