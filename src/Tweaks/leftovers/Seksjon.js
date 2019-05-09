import React from "react";
import Bakgrunnskart from "./bakgrunn/Bakgrunnskart";
import Google from "./bakgrunn/Google";
import Polygon from "./Polygon";
import Gradient from "./Gradient";
import Indexed from "./Indexed";
import Ruter from "./Ruter";

const Seksjon = ({ aktivtFormat, ...props }) => {
  switch (aktivtFormat) {
    case "osm_lys":
    case "osm_mørk":
      return <Bakgrunnskart {...props} />;
    case "google_hybrid":
    case "google_satellite":
      return <Google {...props} />;
    case "raster_gradient":
      return <Gradient {...props} />;
    case "raster_indexed":
      return <Indexed {...props} />;
    case "raster_ruter":
      return <Ruter {...props} />;
    case "polygon":
      return <Polygon {...props} />;
    default:
      console.error("Unknown " + aktivtFormat);
      return null;
  }
};

export default Seksjon;
