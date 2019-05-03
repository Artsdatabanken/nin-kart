import React from "react";
import { withRouter } from "react-router-dom";
import Generelt from "./Generelt";
import Seksjon from "./Seksjon";

const Tweaks = ({ history, ...props }) => {
  if (!props.kart) return null;
  const aktivtFormat = props.kart.aktivtFormat;
  return (
    <div className="tweaks">
      <div class="sidebar_element page_topic_header" />
      <Generelt history={history} {...props}>
        <Seksjon aktivtFormat={aktivtFormat} {...props} />
      </Generelt>
    </div>
  );
};

export default withRouter(Tweaks);
