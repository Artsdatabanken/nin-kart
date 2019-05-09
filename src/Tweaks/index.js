import React from "react";
import { withRouter } from "react-router-dom";
import Bakgrunnskart from "./Undermenyer/Bakgrunnskart";
import Google from "./Undermenyer/Google";
import LegendeElementer from "./Undermenyer/LegendeElementer";
import Gradient from "./Undermenyer/Gradient";
import Indexed from "./Undermenyer/Indexed";
import TilbakePil from "./FerdigeMiniElement/TilbakePil";
import VisualiseringsVariant from "./Undermenyer/VisualiseringsVariant";

const Tweaks = ({ history, ...props }) => {
  if (!props.kart) return null;
  const aktivtFormat = props.kart.aktivtFormat;
  return (
    <div className="tweaks">
      <div class="sidebar_element page_topic_header" />
      <div className="sidebar_element">
        <TilbakePil url={props.url} history={history} />
        {history.location.search === "?vis" && props.kode !== "bakgrunnskart" && (
          <>
            <h3>Visualisering</h3>
            <VisualiseringsVariant
              lag={props.kode}
              onUpdateLayerProp={props.onUpdateLayerProp}
              format={props.kart.format}
              aktivtFormat={props.kart.aktivtFormat}
            />
          </>
        )}

        {(aktivtFormat === "osm_lys" || aktivtFormat === "osm_mørk") && (
          <Bakgrunnskart {...props} />
        )}
        {(aktivtFormat === "google_hybrid" ||
          aktivtFormat === "google_satellite") && <Google {...props} />}
        {aktivtFormat === "raster_gradient" && <Gradient {...props} />}
        {aktivtFormat === "raster_indexed" && <Indexed {...props} />}
        {aktivtFormat === "polygon" && <LegendeElementer {...props} />}
      </div>
    </div>
  );
};

export default withRouter(Tweaks);
