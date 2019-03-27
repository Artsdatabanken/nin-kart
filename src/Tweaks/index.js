import React from "react";
import { withRouter } from "react-router-dom";
import Generelt from "./Generelt";
import Seksjon from "./Seksjon";

const Tweaks = ({ history, ...props }) => {
  if (!props.kart) return null;
  const aktivtFormat = props.kart.aktivtFormat;
  return (
    <div style={{ paddingTop: 55 }}>
      <Generelt history={history} {...props}>
        <Seksjon aktivtFormat={aktivtFormat} {...props} />
      </Generelt>
    </div>
  );
};

export default withRouter(Tweaks);
