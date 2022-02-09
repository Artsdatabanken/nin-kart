import React from "react";
import TemaButton from "./TemaButton";
import typer from "./temaer";
import SectionExpand from "../../../../../GjenbruksElement/SectionExpand";

const TemaMeny = ({ aktivtFormat, onUpdateLayerProp }) => (
  <SectionExpand title={"Bakgrunnstema: " + aktivtFormat}>
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
  </SectionExpand>
);

export default TemaMeny;
