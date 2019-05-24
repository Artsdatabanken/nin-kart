import React from "react";

const matchName = {
  polygon: "Inndelt i typer",
  raster_gradient: "Gradient mellom typene (ikke klar)",
  raster_indexed: "Klassedelt",
  raster: "Rasterisert kart",
  point: "Punkt",
  gradient: "gradient",
  raster_ruter: "Ruter"
};

const GradientEllerTypeinndelt = ({
  onUpdateLayerProp,
  where,
  format,
  aktvtKartlagFormat
}) => {
  return (
    <div className="kartlag_label_liste">
      <div className="sidebar_element">
        <h3>Visualiseringstype</h3>
      </div>

      {Object.keys(format).map(possible_format => (
        <label key={possible_format}>
          <input
            type="radio"
            name="visningstype"
            value={possible_format}
            checked={aktvtKartlagFormat === possible_format}
            onChange={e => {
              onUpdateLayerProp(where, "kart.aktivtFormat", possible_format);
            }}
          />
          {matchName[possible_format] || possible_format}
        </label>
      ))}
    </div>
  );
};
export default GradientEllerTypeinndelt;
