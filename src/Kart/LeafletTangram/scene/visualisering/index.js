import polygon from "./polygon";
import point from "./point";
import gradient from "./gradient";
import indexedRaster from "./indexedRaster";
import openStreetMap from "./openStreetMap";
import googleRaster from "./google_raster";
import ruter from "./ruter";

export default {
  polygon: polygon,
  point: point,
  gradient: gradient,
  raster_gradient: gradient,
  raster_indexed: indexedRaster,
  raster_ruter: ruter,
  osm_lys: openStreetMap,
  osm_mørk: openStreetMap,
  google_hybrid: googleRaster,
  google_satellite: googleRaster
};
