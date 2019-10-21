import { Slider } from "@material-ui/core";
import React from "react";

const SliderElement = ({
  tittel,
  undertittel,
  value,
  min,
  max,
  step,
  onChange
}) => {
  /*
  
  The basic slider with surrounding wrapper.

  */
  return (
    <div className="slider_setting">
      {tittel && <h4>{tittel}</h4>}
      {undertittel && <h5>{undertittel}</h5>}

      <Slider
        className="slider_element"
        min={min || 0}
        max={max || 1}
        step={step || 0.01}
        value={value}
        onChange={(event, value) => onChange(value)}
      />
    </div>
  );
};
export default SliderElement;
