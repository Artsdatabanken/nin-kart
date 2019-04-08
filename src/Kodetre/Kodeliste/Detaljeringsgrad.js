import React from "react";
import SliderSetting from "../../Tweaks/SliderSetting";

const map = {
  0: "Dekningsområde",
  1: "Hovedtypegrupper",
  2: "Hovedtyper",
  3: "Grunntyper"
};
const Detaljeringsgrad = ({ value, onUpdateLayerProp }) => {
  const nivå = map[Math.round(value)];
  return (
    <SliderSetting
      value={value}
      min={0}
      max={3}
      step={0.1}
      tittel="Skalanivå"
      undertittel={nivå}
      onChange={value => onUpdateLayerProp(null, "depth", value)}
    />
  );
};

export default Detaljeringsgrad;
