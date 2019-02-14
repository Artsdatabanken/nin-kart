import { Select } from "@material-ui/core";
import React from "react";

const navn = {
  polygon: "Områder",
  raster_gradient: "Kontinuerlig",
  raster_indexed: "Klassedelt"
};

const VizType = ({ lag, aktivtKartformat, kartformat, onUpdateLayerProp }) => (
  <Select
    style={{ marginLeft: 44 }}
    native
    value={aktivtKartformat}
    onChange={e => onUpdateLayerProp(lag, "aktivtKartformat", e.target.value)}
    inputProps={{
      name: "value",
      id: "value"
    }}
  >
    {Object.keys(kartformat).map(kf => (
      <option key={kf} value={kf}>
        {navn[kf] || kf}
      </option>
    ))}
  </Select>
);

export default VizType;
