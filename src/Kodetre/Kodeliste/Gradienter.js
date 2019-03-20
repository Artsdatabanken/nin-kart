import React from "react";
import Gradient from "./LinearGauge";

const Gradienter = ({
  gradient,
  onNavigate,
  onMouseEnter,
  onMouseLeave,
  opplystKode,
  visKoder
}) => (
  <>
    {Object.entries(gradient).map(([kode, gr]) => (
      <Gradient
        key={kode}
        tittel={gr.tittel.nb}
        url={gr.url}
        kode={gr.kode}
        visKoder={visKoder}
        trinn={gr.trinn}
        onNavigate={onNavigate}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        opplystKode={opplystKode}
      />
    ))}
  </>
);

export default Gradienter;
