import { Switch } from "@material-ui/core";
import React, { useState } from "react";
import FargeVelger from "../../FellesElementer/FargeVelger";
import SliderElement from "../../../../../GjenbruksElement/SliderElement";
import { FormatColorFill, Close } from "@material-ui/icons";

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

            <button
              className="kartlag_element_buttons"
              style={{ float: "right", position: "relative" }}
              onClick={() => {
                setShowColours(!showColours);
              }}
            >
              <FormatColorFill />
              <div
                style={{
                  width: "100%",
                  background: farge,
                  height: "10px",
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                  border: "1px solid grey"
                }}
              />
            </button>
          </span>
          {showColours && (
            <div
              className="subsection"
              style={{ background: "white", position: "relative" }}
            >
              <button
                onClick={() => {
                  setShowColours(!showColours);
                }}
                className="closebutton"
              >
                <Close />
              </button>

              <h6>Velg farger </h6>

              <FargeVelger
                color={farge}
                onUpdateLayerProp={onUpdateLayerProp}
                where={"bakgrunnskart"}
                what={oppdaterElement + "_farge"}
                title={"Farge på elementet"}
              />

              {omriss !== undefined && (
                <FargeVelger
                  color={omriss}
                  onUpdateLayerProp={onUpdateLayerProp}
                  where={"bakgrunnskart"}
                  what={oppdaterElement + "_stroke_farge"}
                  title={"Farge på omriss"}
                />
              )}
              {stroke !== undefined && (
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
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BakgrunnInnstillingListeElement;
