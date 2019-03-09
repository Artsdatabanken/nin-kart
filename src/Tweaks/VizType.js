import { Select } from "@material-ui/core";
import React from "react";

const navn = {
  polygon: "Områder",
  raster_gradient: "Kontinuerlig",
  raster_indexed: "Klassedelt"
};

const VizType = ({ lag, aktivtFormat, format, onUpdateLayerProp }) => (
  <Select
    style={{ marginLeft: 44 }}
    native
    value={aktivtFormat}
    onChange={e => onUpdateLayerProp(lag, "kart.aktivtFormat", e.target.value)}
    inputProps={{
      name: "value",
      id: "value"
    }}
  >
    {Object.keys(format).map(kf => (
      <option key={kf} value={kf}>
        {navn[kf] || kf}
      </option>
    ))}
  </Select>
);

export default VizType;
