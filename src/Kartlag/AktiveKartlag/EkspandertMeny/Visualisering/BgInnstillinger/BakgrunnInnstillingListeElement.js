import { Switch } from "@material-ui/core";
import React, { useState } from "react";
import VelgFargeBoks from "../../FellesElementer/VelgFargeBoks";
import FargeVelger from "../../FellesElementer/FargeVelger";

const BakgrunnInnstillingListeElement = ({
  onUpdateLayerProp,
  oppdaterElement,
  tittel,
  erSynlig,
  farge
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
              console.log("farge: ", farge);
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
        </>
      )}
    </div>
  );
};

export default BakgrunnInnstillingListeElement;
