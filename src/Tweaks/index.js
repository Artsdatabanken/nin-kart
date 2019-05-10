import React from "react";
import { withRouter } from "react-router-dom";
import BakgrunnsInnstillinger from "./Undermenyer/BakgrunnsInnstillinger";
import LegendeElementer from "./Undermenyer/LegendeElementer";
import Gradient from "./Undermenyer/Gradient";
//import Indexed from "./Undermenyer/Indexed";
//import TilbakePil from "./FerdigeMiniElement/TilbakePil";
import VisualiseringsVariant from "./Undermenyer/VisualiseringsVariant";

const Tweaks = ({ history, ...props }) => {
  if (!props.kart) return null;
  const aktivtFormat = props.kart.aktivtFormat;
  return (
    <div className="tweaks">
      <div className="sidebar_element page_topic_header" />

      {/*<TilbakePil url={props.url} history={history} />*/}

      {history.location.search === "?vis" && props.kode !== "bakgrunnskart" && (
        <VisualiseringsVariant
          lag={props.kode}
          onUpdateLayerProp={props.onUpdateLayerProp}
          format={props.kart.format}
          aktivtFormat={props.kart.aktivtFormat}
        />
      )}
      {props.kode === "bakgrunnskart" && <BakgrunnsInnstillinger {...props} />}
      {aktivtFormat === "raster_gradient" && <Gradient {...props} />}
      {/* {aktivtFormat === "raster_indexed" && <Indexed {...props} />}*/}
      {aktivtFormat === "polygon" && <LegendeElementer {...props} />}
    </div>
  );
};

export default withRouter(Tweaks);
