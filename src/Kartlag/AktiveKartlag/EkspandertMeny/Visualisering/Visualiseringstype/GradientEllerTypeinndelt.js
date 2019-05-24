import React from "react";

const GradientEllerTypeinndelt = ({ onUpdateLayerProp, where, format }) => {
  console.log(format);
  return (
    <div className="kartlag_label_liste">
      <div className="sidebar_element">
        <h3>Visualiseringstype</h3>
      </div>
      <label>
        <input
          type="radio"
          name="visningstype"
          value="gradient"
          onChange={e =>
            onUpdateLayerProp(where, "kart.aktivtFormat", "raster_gradient")
          }
        />{" "}
        Gradient mellom typene{" "}
      </label>
      <label>
        <input
          type="radio"
          name="visningstype"
          value="typeinndelt"
          onChange={e =>
            onUpdateLayerProp(where, "kart.aktivtFormat", "raster_indexed")
          }
        />{" "}
        Inndelt i typer{" "}
      </label>
    </div>
  );
};
export default GradientEllerTypeinndelt;
