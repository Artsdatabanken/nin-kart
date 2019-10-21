import React from "react";
import BakgrunnInnstillinger from "./Visualisering/BgInnstillinger/BakgrunnInnstillinger";
import LegendeElementer from "./UnderElementer/LegendeElementer";
import TemaMeny from "./Visualisering/TemaMeny/TemaMeny";
import GradientEllerTypeinndelt from "./Visualisering/VisualiseringsType/GradientEllerTypeinndelt";
import GradientFilter from "./Filtere/GradientFilter.js";
import FargeVelger from "./FellesElementer/FargeVelger";
import { Slider } from "@material-ui/core";

const EkspandertInnhold = ({
  kode,
  aktivtFormat,
  onUpdateLayerProp,
  kartlag
}) => {
  const current = aktivtFormat.aktivtFormat;
  const currenctActiveFormatNode = aktivtFormat.format[current];
  const blendmode = kartlag.blendmode || "multiply";
  let hide_blendmodes =
    !!kartlag.kart.format.polygon || !!kartlag.kart.format.raster_ruter;
  return (
    <div>
      {kode === "bakgrunnskart" && (
        <TemaMeny
          onUpdateLayerProp={onUpdateLayerProp}
          aktivtFormat={aktivtFormat}
        />
      )}

      <>
        {kode === "bakgrunnskart" ? (
          <>
            {aktivtFormat.aktivtFormat === "google_hybrid" ||
            aktivtFormat.aktivtFormat === "topo4" ||
            aktivtFormat.aktivtFormat === "google_satellite" ? (
              <FargeVelger
                color={currenctActiveFormatNode.tint}
                onUpdateLayerProp={onUpdateLayerProp}
                where={kartlag.kode}
                what={"kart.format." + current + ".tint"}
                title={"Velg fargetone for kartbladet"}
              />
            ) : (
              <BakgrunnInnstillinger
                onUpdateLayerProp={onUpdateLayerProp}
                aktivtFormat={aktivtFormat}
              />
            )}
          </>
        ) : (
          <div className="kartlag_sub_bg">
            <>
              <GradientEllerTypeinndelt
                onUpdateLayerProp={onUpdateLayerProp}
                where={kartlag.kode}
                format={kartlag.kart.format}
                aktvtKartlagFormat={kartlag.kart.aktivtFormat}
              />
              {!hide_blendmodes && (
                <>
                  <div className="submeny_container">
                    <input
                      type="radio"
                      name="blendmode"
                      checked={blendmode === "multiply" && "checked"}
                      onChange={e => {
                        onUpdateLayerProp(
                          kartlag.kode,
                          "blendmode",
                          "multiply"
                        );
                      }}
                    />
                    Multiplisert farge
                    <input
                      type="radio"
                      name="blendmode"
                      checked={blendmode === "translucent" && "checked"}
                      onChange={e => {
                        onUpdateLayerProp(
                          kartlag.kode,
                          "blendmode",
                          "translucent"
                        );
                      }}
                    />
                    Helfarget
                  </div>

                  {kartlag.blendmode === "translucent" && (
                    <div className="submeny_container">
                      Gjennomsiktighet i %
                      <Slider
                        className="slider_element"
                        value={kartlag.opacity || 1}
                        min={0.01}
                        max={1}
                        onChange={(e, value) =>
                          onUpdateLayerProp(kartlag.kode, "opacity", value)
                        }
                      />
                    </div>
                  )}
                </>
              )}

              <GradientFilter
                kartlag={kartlag}
                onUpdateLayerProp={onUpdateLayerProp}
                kode={kode}
              />
            </>
            <LegendeElementer
              kartlag={kartlag}
              aktivtFormat={aktivtFormat}
              onUpdateLayerProp={onUpdateLayerProp}
              skjul_meny_tittel={true}
            />
          </div>
        )}
      </>
    </div>
  );
};

export default EkspandertInnhold;
