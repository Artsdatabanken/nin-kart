import React from "react";
import { withRouter } from "react-router-dom";
import Bakgrunnskart from "./bakgrunn/Bakgrunnskart";
import Google from "./bakgrunn/Google";
import Polygon from "./Polygon";
import Gradient from "./Gradient";
import Indexed from "./Indexed";
import Generelt from "./Generelt";

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
    case "polygon":
      return <Polygon {...props} />;
    default:
      console.error("Unknown " + aktivtFormat);
  }
};

const Tweaks = ({ history, ...props }) => {
  const aktivtFormat = props.kart.aktivtFormat;
  if (!aktivtFormat) return null;
  return (
    <div style={{ paddingTop: 55 }}>
      <Generelt history={history} {...props}>
        <Seksjon aktivtFormat={aktivtFormat} {...props} />
      </Generelt>
    </div>
  );
};

export default withRouter(Tweaks);
