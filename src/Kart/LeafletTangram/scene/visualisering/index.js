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
  "raster.gradient": gradientDraw,
  "raster.indexed": indexedRasterDraw,
  osm_lys: openStreetMap,
  osm_mørk: openStreetMap,
  google: googleRaster
};
