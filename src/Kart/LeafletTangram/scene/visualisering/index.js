import polygonDraw from "./polygon";
import pointDraw from "./point";
import gradientDraw from "./gradient";
import indexedRasterDraw from "./indexedRaster";

export default {
  polygon: polygonDraw,
  point: pointDraw,
  gradient: gradientDraw,
  "raster.gradient": gradientDraw,
  "raster.indexed": indexedRasterDraw
};
