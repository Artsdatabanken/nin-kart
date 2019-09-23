import polygon from "./polygon";
import gradientVisualisering from "./gradientVisualisering";
import indexedRaster from "./indexedRaster";
import openStreetMap from "./openStreetMap";
import googleRaster from "./google_raster";
import ruter from "./ruter";

export default {
  polygon: polygon, // kalk
  gradient: gradientVisualisering, // bioklimatisk sone, arealbruksintensitet ++
  raster_gradient: gradientVisualisering, // bioklimatisk sone, arealbruksintensitet ++
  raster_indexed: indexedRaster, /// Landskapstyper
  raster_ruter: ruter, // Arter
  osm_lys: openStreetMap,
  osm_mørk: openStreetMap,
  topo4: googleRaster,
  google_hybrid: googleRaster,
  google_satellite: googleRaster
};
