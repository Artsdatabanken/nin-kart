import React from "react";
import SliderSetting from "../../Tweaks/SliderSetting";

const map = {
  3: "Hovedtypegrupper",
  4: "Hovedtyper",
  5: "Grunntyper"
};
const Detaljeringsgrad = ({ value, onUpdateLayerProp }) => {
  const nivå = map[Math.round(value)];
  return (
    <SliderSetting
      value={value || 0}
      min={3}
      max={5}
      step={0.1}
      tittel="Skalanivå"
      undertittel={nivå}
      onChange={value => onUpdateLayerProp(null, "depth", value)}
    />
  );
};

export default Detaljeringsgrad;
