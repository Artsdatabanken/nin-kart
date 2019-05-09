import React from "react";
import { withRouter } from "react-router-dom";
import Generelt from "./Generelt";
//import Seksjon from "./Seksjon";
import Bakgrunnskart from "./bakgrunn/Bakgrunnskart";
import Google from "./bakgrunn/Google";
import Polygon from "./Polygon";
import Gradient from "./Gradient";
import Indexed from "./Indexed";

const Tweaks = ({ history, ...props }) => {
  if (!props.kart) return null;
  const aktivtFormat = props.kart.aktivtFormat;
  console.log(aktivtFormat);
  return (
    <div className="tweaks">
      <div class="sidebar_element page_topic_header" />
      <Generelt history={history} {...props}>
        {(aktivtFormat === "osm_lys" || aktivtFormat === "osm_mørk") && (
          <Bakgrunnskart {...props} />
        )}
        {(aktivtFormat === "google_hybrid" ||
          aktivtFormat === "google_satellite") && <Google {...props} />}
        {aktivtFormat === "raster_gradient" && <Gradient {...props} />}
        {aktivtFormat === "raster_indexed" && <Indexed {...props} />}
        {aktivtFormat === "polygon" && <Polygon {...props} />}}
        {/*<Seksjon aktivtFormat={aktivtFormat} {...props} />*/}
      </Generelt>
    </div>
  );
};

export default withRouter(Tweaks);
