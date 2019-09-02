import Menyelement from "./Menyelement";
import { ListSubheader, Typography } from "@material-ui/core";
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

  return (
    <>
      <ListSubheader>Innstillinger</ListSubheader>

      <Menyelement
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          onUpdateSetting("visKoder", !visKoder);
        }}
        icon={
          <Typography>
            <span>NA</span>
          </Typography>
        }
        primary="Vis koder i tillegg til navn"
        toggle
        checked={visKoder}
      />
      <Menyelement
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          onUpdateSetting("sorterPåKode", !sorterPåKode);
        }}
        icon={<SortByAlpha />}
        primary="Sorter lister etter"
        secondary={sorterPåKode ? " Koder" : " Navn"}
      />
      <div className="spraakvelger">
        <span>Velg språk</span>

        <div className="spraakalternativer">
          <button
            onClick={e => {
              setExpanded(!expanded);
            }}
          >
            {spraak}
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
                  handleSpraak("la");
                  setExpanded(!expanded);
                }}
              >
                Latin
              </button>
            </>
          )}
        </div>
      </div>

      <Menyelement
        icon={
          <Typography>
            <span>Aa</span>
          </Typography>
        }
        primary="Velg språk"
      />
    </>
  );
};

export default Innstillinger;
