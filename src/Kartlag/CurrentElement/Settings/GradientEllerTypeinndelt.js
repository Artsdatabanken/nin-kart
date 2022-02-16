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
  if (!format[aktvtKartlagFormat]) return null;
  const kartformat = format[aktvtKartlagFormat];
  const { visning, aktivVisning } = kartformat;
  let optionNumbers = 0;
  if (visning !== undefined) {
    optionNumbers = Object.keys(visning).length;
  }
  return (
    <div className="submeny_container">
      {optionNumbers > 1 ? (
        <div className="kartlag_label_liste">
          {visning.map(possible_format => (
            <>
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
              <label
                key={possible_format}
                onClick={e => {
                  onUpdateLayerProp(
                    where,
                    "kart.format.raster_gradient.aktivVisning",
                    possible_format
                  );
                }}
              >
                {matchName[possible_format] || possible_format}
              </label>
            </>
          ))}
        </div>
      ) : (
        <>
          Visualisering: {matchName[aktvtKartlagFormat] || aktvtKartlagFormat}
        </>
      )}
    </div>
  );
};
export default GradientEllerTypeinndelt;
