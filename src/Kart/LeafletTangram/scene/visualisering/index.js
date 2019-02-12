import polygonDraw from "./polygon";
import pointDraw from "./point";
import gradientDraw from "./gradient";
import indexedRasterDraw from "./indexedRaster";
import openStreetMap from "./openStreetMap";
import googleRaster from "./google_raster";

export default {
  polygon: polygonDraw,
  point: pointDraw,
  gradient: gradientDraw,
  raster_gradient: gradientDraw,
  raster_indexed: indexedRasterDraw,
  osm_lys: openStreetMap,
  osm_mørk: openStreetMap,
  google_hybrid: googleRaster,
  google_satellite: googleRaster
};
