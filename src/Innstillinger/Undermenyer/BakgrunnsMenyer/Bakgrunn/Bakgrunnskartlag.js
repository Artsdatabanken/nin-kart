import { Switch } from "@material-ui/core";
import React, { useState } from "react";
import VelgFargeBoks from "Innstillinger/FerdigeMiniElement/VelgFargeBoks";
import tinycolor from "tinycolor2";
import ColorPicker from "Innstillinger/FerdigeMiniElement/ColorPicker";

const Bakgrunnskartlag = ({
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
            <div className="sidebar_element">
              <h3>Fyllfarge</h3>
              <ColorPicker
                color={farge}
                onChange={farge => {
                  const rgbString = tinycolor(farge.rgb).toRgbString();
                  onUpdateLayerProp(
                    "bakgrunnskart",
                    oppdaterElement + "_farge",
                    rgbString
                  );
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Bakgrunnskartlag;
