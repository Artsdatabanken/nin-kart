import React from "react";
import GradientEllerTypeinndelt from "./Visualisering/VisualiseringsType/GradientEllerTypeinndelt";
import GradientFilter from "./Filtere/GradientFilter.js";
import { Slider } from "@material-ui/core";

const CurrentLayerSettings = ({ onUpdateLayerProp, meta }) => {
  const { kode, kart, opacity } = meta;
  const blendmode = meta.blendmode || "multiply";

  return (
    <div className="subsection subexpand">
      <h4>Innstillinger for kartlaget</h4>
      <GradientEllerTypeinndelt
        onUpdateLayerProp={onUpdateLayerProp}
        where={kode}
        format={kart.format}
        aktvtKartlagFormat={kart.aktivtFormat}
      />
      <div className="submeny_container">
        <input
          type="radio"
          name="blendmode"
          checked={blendmode === "multiply" && "checked"}
          onChange={e => {
            onUpdateLayerProp(kode, "blendmode", "multiply");
          }}
        />
        Multiplisert farge
        <input
          type="radio"
          name="blendmode"
          checked={blendmode === "translucent" && "checked"}
          onChange={e => {
            onUpdateLayerProp(kode, "blendmode", "translucent");
          }}
        />
        Helfarget
      </div>

      {meta.blendmode === "translucent" && (
        <div className="submeny_container">
          Gjennomsiktighet i %
          <Slider
            className="slider_element"
            value={opacity || 1}
            min={0.01}
            max={1}
            step={0.01}
            onChange={(e, value) => onUpdateLayerProp(kode, "opacity", value)}
          />
        </div>
      )}

      <GradientFilter meta={meta} onUpdateLayerProp={onUpdateLayerProp} />
    </div>
  );
};

export default CurrentLayerSettings;
