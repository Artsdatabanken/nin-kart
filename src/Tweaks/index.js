import React from "react";
import { withRouter } from "react-router-dom";
import Bakgrunnskart from "./bakgrunn/Bakgrunnskart";
import Google from "./bakgrunn/Google";
import Polygon from "./Polygon";
import Gradient from "./Gradient";
import Indexed from "./Indexed";
import Generelt from "./Generelt";

const Seksjon = ({ aktivtKartformat, ...props }) => {
  switch (aktivtKartformat) {
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
    case "polygon":
      return <Polygon {...props} />;
    default:
      console.error("Unknown " + aktivtKartformat);
  }
};

const Tweaks = ({ aktivtKartformat, history, ...props }) => {
  if (!aktivtKartformat) return null;
  return (
    <div style={{ paddingTop: 55 }}>
      <Generelt search={history.location.search} {...props}>
        <Seksjon aktivtKartformat={aktivtKartformat} {...props} />
      </Generelt>
    </div>
  );
};

export default withRouter(Tweaks);
