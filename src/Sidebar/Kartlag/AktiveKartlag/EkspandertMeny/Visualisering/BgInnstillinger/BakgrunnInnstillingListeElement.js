import { Switch } from "@material-ui/core";
import React, { useState } from "react";
import VelgFargeBoks from "../../FellesElementer/VelgFargeBoks";
import FargeVelger from "../../FellesElementer/FargeVelger";
import SliderElement from "GjenbruksElement/SliderElement";

const BakgrunnInnstillingListeElement = ({
  onUpdateLayerProp,
  oppdaterElement,
  tittel,
  erSynlig,
  farge,
  omriss,
  stroke
}) => {
  const [showColours, setShowColours] = useState(false);

  return (
    <div>
      <Switch
        onClick={e => e.stopPropagation()}
        onChange={() => {
          onUpdateLayerProp("bakgrunnskart", oppdaterElement, !erSynlig);
        }}
        checked={erSynlig}
      />

      <span>{tittel} </span>

      {erSynlig && (
        <>
          <span
            onClick={e => {
              // console.log("farge: ", farge);
              setShowColours(!showColours);
            }}
          >
            {farge}
            <VelgFargeBoks farge={farge} />
          </span>
          {showColours && (
            <FargeVelger
              color={farge}
              onUpdateLayerProp={onUpdateLayerProp}
              where={"bakgrunnskart"}
              what={oppdaterElement + "_farge"}
            />
          )}
          {showColours && omriss !== undefined && (
            <FargeVelger
              color={omriss}
              onUpdateLayerProp={onUpdateLayerProp}
              where={"bakgrunnskart"}
              what={oppdaterElement + "_stroke_farge"}
              title={"Velg farge på omriss"}
            />
          )}
          {showColours && stroke !== undefined && (
            <SliderElement
              value={stroke || 0}
              min={0}
              max={10}
              step={0.2}
              tittel={"Tykkelse: " + (stroke || 0).toFixed(1) + " piksler"}
              onChange={v =>
                onUpdateLayerProp(
                  "bakgrunnskart",
                  oppdaterElement + "_stroke_width",
                  v
                )
              }
            />
          )}
        </>
      )}
    </div>
  );
};

export default BakgrunnInnstillingListeElement;
