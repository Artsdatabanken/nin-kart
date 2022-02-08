import React from "react";
import BakgrunnInnstillinger from "./Visualisering/BgInnstillinger/BakgrunnInnstillinger";
import LegendeElementer from "./UnderElementer/LegendeElementer";
import TemaMeny from "./Visualisering/TemaMeny/TemaMeny";
import GradientEllerTypeinndelt from "./Visualisering/VisualiseringsType/GradientEllerTypeinndelt";
import GradientFilter from "./Filtere/GradientFilter.js";
import FargeVelger from "./FellesElementer/FargeVelger";
import { Slider } from "@material-ui/core";

const EkspandertInnhold = ({ onUpdateLayerProp, meta }) => {
  const { kode, aktivtFormat, kart, opacity } = meta;
  const current = aktivtFormat.aktivtFormat;
  const currenctActiveFormatNode = aktivtFormat.format[current];
  const blendmode = meta.blendmode || "multiply";
  let hide_blendmodes = false;

  return (
    <div>
      {kode !== "bakgrunnskart" && (
        <div className="_kartlag_sub_bg">
          <>
            <GradientEllerTypeinndelt
              onUpdateLayerProp={onUpdateLayerProp}
              where={kode}
              format={kart.format}
              aktvtKartlagFormat={kart.aktivtFormat}
            />
            {!hide_blendmodes && (
              <>
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
                      onChange={(e, value) =>
                        onUpdateLayerProp(kode, "opacity", value)
                      }
                    />
                  </div>
                )}
              </>
            )}

            <GradientFilter meta={meta} onUpdateLayerProp={onUpdateLayerProp} />
          </>
          <LegendeElementer
            meta={meta}
            onUpdateLayerProp={onUpdateLayerProp}
            skjul_meny_tittel={true}
          />
        </div>
      )}
    </div>
  );
};

export default EkspandertInnhold;
