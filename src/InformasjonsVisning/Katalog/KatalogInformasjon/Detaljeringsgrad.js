import React from "react";
import SliderElement from "GjenbruksElement/SliderElement";

const map = {
  0: "Dekningsområde",
  1: "Hovedtypegrupper",
  2: "Hovedtyper",
  3: "Grunntyper"
};

const Detaljeringsgrad = ({ value, onUpdateLayerProp }) => {
  /*
  
  Currently only availiable for Landskap/Typeinndeling

  SKRUDD AV NÅ HER SKALANIVÅ
  
  */
  const nivå = map[Math.round(value)];

  return (
    <div className="sidebar_element">
      <h3>Skalanivå</h3>
      <SliderElement
        value={value}
        min={0}
        max={3}
        step={0.1}
        undertittel={nivå}
        onChange={value => onUpdateLayerProp(null, "depth", value)}
      />
    </div>
  );
};

export default Detaljeringsgrad;
