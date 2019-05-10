import React from "react";
import TemaButton from "./TemaButton";
import typer from "./temaer";

const TemaMeny = ({ valgt, onUpdateLayerProp }) => (
  <>
    <div className="sidebar_element">
      <h1>Velg Tema</h1>
      <h2>Rasterkart eller kartblad fra Google</h2>
    </div>

    {Object.keys(typer).map(key => {
      return (
        <TemaButton
          button
          type={key}
          valgt={valgt}
          onUpdateLayerProp={onUpdateLayerProp}
        />
      );
    })}
  </>
);

export default TemaMeny;
