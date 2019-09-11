import React from "react";
import BakgrunnInnstillinger from "./Visualisering/BgInnstillinger/BakgrunnInnstillinger";
import LegendeElementer from "./UnderElementer/LegendeElementer";
import TemaMeny from "./Visualisering/TemaMeny/TemaMeny";
import GradientEllerTypeinndelt from "./Visualisering/VisualiseringsType/GradientEllerTypeinndelt";
import GradientFilter from "./Filtere/GradientFilter.js";
import FargeVelger from "./FellesElementer/FargeVelger";

const EkspandertInnhold = ({
  kode,
  aktivtFormat,
  onUpdateLayerProp,
  kartlag
}) => {
  const current = aktivtFormat.aktivtFormat;
  const currenctActiveFormatNode = aktivtFormat.format[current];
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
              <div className="submeny_container">
                <button
                  onClick={e => {
                    onUpdateLayerProp(kartlag.kode, "blendmode", "multiply");
                  }}
                >
                  Multiply
                </button>
                <button
                  onClick={e => {
                    onUpdateLayerProp(kartlag.kode, "blendmode", "translucent");
                  }}
                >
                  translucent
                </button>
              </div>

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
