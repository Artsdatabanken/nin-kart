import React, { useState } from "react";
import Overordnet from "./Navigeringsliste/Overordnet";
import Navigeringsliste from "./Navigeringsliste/Navigeringsliste";
import språk from "Funksjoner/språk";
import isItalics from "Funksjoner/isItalics";
import Bildeavatar from "GjenbruksElement/Bildeavatar";
import { HelpOutline } from "@material-ui/icons";

const Meny = ({
  aktivTab,
  meta,
  onNavigate,
  onUpdateMetaProp,
  opplyst,
  onMouseEnter,
  onMouseLeave,
  lokalitet,
  lokalitetdata,
}) => {
  /*  
Intern navigasjon innad på en side.
Sidebarmeny-navigeringen.
  */
  const [expanded, setExpanded] = useState(false);
  let tittel = "hjelp";
  let nivå = "";
  let sn = "";
  let url = "/;";
  if (meta) {
    url = meta.url;
    tittel = språk(meta.tittel);
    if (tittel === "undefined" && meta.tittel.sn) {
      tittel = meta.tittel.sn;
      sn = "sn";
    } else if (meta.tittel.sn && tittel === meta.tittel.sn) {
      sn = "sn";
    }
    nivå = meta["nivå"];
  }

  return (
    <div
      //      className={
      //          (aktivTab === "meny" ? "mobile_on" : "mobile_off") + " sidebar"
      //      }
      style={{
        paddingTop: 16,
        _zIndex: expanded && aktivTab === "kartlag" ? 20 : 1,
        _height: expanded && aktivTab === "kartlag" && "auto",
        _maxHeight: expanded && aktivTab === "kartlag" && "100%",
        _borderBottom:
          expanded && aktivTab === "kartlag" && "2px solid $bright-nin",
      }}
    >
      <div style={{}}>
        <>
          {meta && (
            <Overordnet
              overordnet={meta.overordnet}
              onNavigate={onNavigate}
              setExpanded={setExpanded}
            />
          )}

          <div
            className={
              isItalics(nivå, sn) ? "italics nav_current" : "nav_current"
            }
          >
            {" "}
            {false && meta && <Bildeavatar url={url} />}
            {tittel === "hjelp" && <HelpOutline />}
            {"▾ " + tittel}
          </div>

          <Navigeringsliste
            parentkode={meta ? meta.kode : "kode"}
            metadata={meta && meta.barn}
            setExpanded={setExpanded}
            onNavigate={onNavigate}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            opplyst={opplyst}
            onUpdateMetaProp={onUpdateMetaProp}
          />
        </>
      </div>
    </div>
  );
};

export default Meny;
