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
  const kartformat = format[aktvtKartlagFormat];
  const { visning, aktivVisning } = kartformat;
  let optionNumbers = 0;
  if (visning !== undefined) {
    optionNumbers = Object.keys(visning).length;
  }
  return (
    <>
      {optionNumbers > 1 ? (
        <div className="kartlag_label_liste">
          <h3>Visualisering:</h3>
          {visning.map(possible_format => (
            <label key={possible_format}>
              <input
                type="radio"
                name="visningstype"
                value={possible_format}
                checked={aktivVisning === possible_format}
                onChange={e => {
                  onUpdateLayerProp(
                    where,
                    "kart.format.raster_gradient.aktivVisning",
                    possible_format
                  );
                }}
              />
              {matchName[possible_format] || possible_format}
            </label>
          ))}
        </div>
      ) : (
        <h3>
          Visualisering: {matchName[aktvtKartlagFormat] || aktvtKartlagFormat}{" "}
        </h3>
      )}
    </>
  );
};
export default GradientEllerTypeinndelt;
