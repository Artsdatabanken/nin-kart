import Menyelement from "./Menyelement";
import { SortByAlpha } from "@material-ui/icons";
import React, { useState } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";

const Innstillinger = ({
  visKoder,
  sorterPåKode,
  onUpdateSetting,
  spraak,
  handleSpraak
}) => {
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  let spraaknavn = "";
  if (spraak === "en") {
    spraaknavn = "Engelsk";
  } else if (spraak === "nb") {
    spraaknavn = "Norsk bokmål";
  } else if (spraak === "nn") {
    spraaknavn = "Nynorsk";
  } else if (spraak === "sn") {
    spraaknavn = "Vitenskapelig navn";
  }

  return (
    <>
      <h2>Innstillinger</h2>

      <Menyelement
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          onUpdateSetting("visKoder", !visKoder);
        }}
        icon={<span>NA</span>}
        primary="Vis koder i tillegg til navn"
        toggle
        checked={visKoder}
      />

      <div className="spraakvelger">
        <span>
          <SortByAlpha />
        </span>
        <span>Sorter lister etter</span>
        <div className="spraakalternativer">
          <button
            onClick={e => {
              setExpanded(false);
              setOpen(!open);
            }}
          >
            {sorterPåKode ? " koder" : " navn"}
            {open === true ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </button>
          {open === true && (
            <>
              <button
                onClick={e => {
                  onUpdateSetting("sorterPåKode", true);
                  setOpen(!open);
                }}
              >
                koder
              </button>
              <button
                onClick={e => {
                  onUpdateSetting("sorterPåKode", false);
                  setOpen(!open);
                }}
              >
                navn
              </button>
            </>
          )}
        </div>
      </div>

      <div className="spraakvelger">
        <span>Aa</span>
        <span>Velg språk</span>

        <div className="spraakalternativer">
          <button
            onClick={e => {
              setOpen(false);
              setExpanded(!expanded);
            }}
          >
            {spraaknavn}
            {expanded === true ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </button>
          {expanded === true && (
            <>
              <button
                onClick={e => {
                  handleSpraak("en");
                  setExpanded(!expanded);
                }}
              >
                Engelsk
              </button>
              <button
                onClick={e => {
                  handleSpraak("nb");
                  setExpanded(!expanded);
                }}
              >
                Norsk bokmål
              </button>
              <button
                onClick={e => {
                  handleSpraak("nn");
                  setExpanded(!expanded);
                }}
              >
                Nynorsk
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Innstillinger;
