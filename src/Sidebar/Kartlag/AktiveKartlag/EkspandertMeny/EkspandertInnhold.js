import React from "react";
import BakgrunnInnstillinger from "./Visualisering/BgInnstillinger/BakgrunnInnstillinger";
import LegendeElementer from "./UnderElementer/LegendeElementer";
import TemaMeny from "./Visualisering/TemaMeny/TemaMeny";
import GradientEllerTypeinndelt from "./Visualisering/VisualiseringsType/GradientEllerTypeinndelt";
import GradientFilter from "./Filtere/GradientFilter.js";
import FargeVelger from "./FellesElementer/FargeVelger";

const EkspandertInnhold = ({
  kode,
  theme,
  aktivtFormat,
  onUpdateLayerProp,
  kartlag,
  settings
}) => {
  const current = aktivtFormat.aktivtFormat;
  const currenctActiveFormatNode = aktivtFormat.format[current];
  return (
    <div>
      {kode === "bakgrunnskart" && theme && (
        <TemaMeny
          onUpdateLayerProp={onUpdateLayerProp}
          aktivtFormat={aktivtFormat}
        />
      )}

      {settings && (
        <>
          {kode === "bakgrunnskart" ? (
            <>
              {aktivtFormat.aktivtFormat === "google_hybrid" ||
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
            <>
              <h2>Rediger Innhold</h2>

              <GradientFilter
                kartlag={kartlag}
                onUpdateLayerProp={onUpdateLayerProp}
                kode={kode}
              />

              <GradientEllerTypeinndelt
                onUpdateLayerProp={onUpdateLayerProp}
                where={kartlag.kode}
                format={kartlag.kart.format}
                aktvtKartlagFormat={kartlag.kart.aktivtFormat}
              />

              {kartlag.barn.length === 0 ? (
                <FargeVelger
                  color={kartlag.farge}
                  onUpdateLayerProp={onUpdateLayerProp}
                  where={kartlag.kode}
                />
              ) : (
                <LegendeElementer
                  kartlag={kartlag}
                  aktivtFormat={aktivtFormat}
                  onUpdateLayerProp={onUpdateLayerProp}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default EkspandertInnhold;
