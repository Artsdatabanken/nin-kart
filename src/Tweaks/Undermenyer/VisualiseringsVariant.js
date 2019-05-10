import React from "react";

const navn = {
  polygon: "Områder",
  raster_gradient: "Kontinuerlig",
  raster_indexed: "Klassedelt"
};

const VisualiseringsVariant = ({
  lag,
  aktivtFormat,
  format,
  onUpdateLayerProp
}) => (
  <>
    <div className="sidebar_element">
      <h1>Visualiseringstype</h1>
      <h2>Velg hvilke element som vises og redigeres</h2>
    </div>
    <div className="sidebar_element">
      <select
        className="visualisation_selector"
        value={aktivtFormat}
        onChange={e =>
          onUpdateLayerProp(lag, "kart.aktivtFormat", e.target.value)
        }
      >
        {Object.keys(format).map(kf => (
          <option key={kf} value={kf} className="optionsName">
            {navn[kf] || kf}
          </option>
        ))}
      </select>
    </div>
  </>
);

export default VisualiseringsVariant;
