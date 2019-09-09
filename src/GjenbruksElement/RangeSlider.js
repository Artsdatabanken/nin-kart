import React from "react";
import Slider from "@material-ui/core/Slider";

export default function RangeSlider({
  min,
  max,
  step,
  onUpdateLayerProp,
  kode
}) {
  const [value, setValue] = React.useState([min, max]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    onUpdateLayerProp(kode, "kart.format.raster_gradient.filterMin", value[0]);
    onUpdateLayerProp(kode, "kart.format.raster_gradient.filterMax", value[1]);
  };
  return (
    <div className="slider_element ">
      <Slider
        value={value}
        step={step}
        min={min || 0}
        max={max || 1}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
      />
    </div>
  );
}
