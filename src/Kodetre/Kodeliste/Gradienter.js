import React from "react";
import Gradient from "./LinearGauge";

const Gradienter = ({
  gradient,
  onNavigate,
  onMouseEnter,
  onMouseLeave,
  opplystKode
}) => {
  return (
    <React.Fragment>
      {Object.keys(gradient).map(type => {
        const gr = gradient[type];
        return (
          <Gradient
            key={type}
            tittel={type}
            url={gr.url}
            trinn={gr.trinn}
            onNavigate={onNavigate}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            opplystKode={opplystKode}
          />
        );
      })}
    </React.Fragment>
  );
};

export default Gradienter;
