import { Slider } from "@material-ui/lab";
import React from "react";

const SliderSetting = ({
  tittel,
  undertittel,
  value,
  min,
  max,
  step,
  decimals = 1,
  onChange
}) => {
  return (
    <div className="slider_setting">
      {tittel && <div>{tittel}</div>}
      {undertittel && <div>{undertittel}</div>}
      {value.toFixed(decimals) && (
        <div className="slider_value">{value.toFixed(decimals)}</div>
      )}
      <Slider
        className="slider"
        min={min || 0}
        max={max || 1}
        step={step || 0.01}
        value={value}
        onChange={(event, value) => onChange(value)}
      />
    </div>
  );
};
export default SliderSetting;
