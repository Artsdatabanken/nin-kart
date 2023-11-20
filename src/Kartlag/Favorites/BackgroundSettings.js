import React from "react";
import TemaMeny from "./BackgroundSettings/TemaMeny/TemaMeny";
import BakgrunnInnstillinger from "./BackgroundSettings/BgInnstillinger/BakgrunnInnstillinger";
import FargeVelger from "../Fargevelgere/FargeVelger";
import SectionExpand from "../../GjenbruksElement/SectionExpand";

const BackgroundSettings = ({ kartlag, onUpdateLayerProp }) => {
  if (!kartlag) return null;
  const { kode, kart } = kartlag;
  const currentmap = kart.aktivtFormat;
  if (kode !== "bakgrunnskart") return null;
  return (
    <div className="subsection subexpand">
      <h4>Innstillinger</h4>
      <TemaMeny
        onUpdateLayerProp={onUpdateLayerProp}
        aktivtFormat={currentmap}
      />

      {currentmap === "google_hybrid" ||
      currentmap === "topo4" ||
      currentmap === "google_satellite" ? (
        <SectionExpand title={"Fargefilter"}>
          <FargeVelger
            color={kart.format[currentmap].tint}
            onUpdateLayerProp={onUpdateLayerProp}
            where={kode}
            what={"kart.format." + currentmap + ".tint"}
            title={"Velg fargetone for kartbladet"}
          />
        </SectionExpand>
      ) : (
        <SectionExpand title={"Bakgrunnsinstillinger"}>
          <BakgrunnInnstillinger
            onUpdateLayerProp={onUpdateLayerProp}
            aktivtFormat={kart}
          />
        </SectionExpand>
      )}
    </div>
  );
};

export default BackgroundSettings;
