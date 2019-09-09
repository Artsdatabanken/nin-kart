import React from "react";
import TemaButton from "./TemaButton";
import typer from "./temaer";

const TemaMeny = ({ aktivtFormat, onUpdateLayerProp }) => (
  <>
    <div className="sidebar_element">
      <h1>Velg tema</h1>
      <h2>Rasterkart eller kartblad fra Google</h2>
    </div>

    {Object.keys(typer).map(key => {
      return (
        <TemaButton
          key={key}
          button
          type={key}
          aktivtFormat={aktivtFormat}
          onUpdateLayerProp={onUpdateLayerProp}
        />
      );
    })}
  </>
);

export default TemaMeny;
