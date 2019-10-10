import React, { useState } from "react";
import Overordnet from "./Navigeringsliste/Overordnet";
import KurveContainer from "GjenbruksElement/Kurver/KurveContainer";
import Navigeringsliste from "./Navigeringsliste/Navigeringsliste";
import Kurve from "GjenbruksElement/Kurver/Kurve";
import språk from "Funksjoner/språk";
import Bildeavatar from "GjenbruksElement/Bildeavatar";
import {
  Home,
  HelpOutline,
  KeyboardArrowDown,
  KeyboardArrowUp
} from "@material-ui/icons";

const Meny = ({
  //data,
  aktivTab,
  meta,
  onNavigate,
  onUpdateMetaProp,
  opplyst,
  onMouseEnter,
  onMouseLeave
}) => {
  /*
  
Intern navigasjon innad på en side.
Sidebarmeny-navigeringen.
  
  */

  const [expanded, setExpanded] = useState(false);
  let tittel = "hjelp";
  let url = "/;";
  let nivå = "";
  if (meta) {
    url = meta.url;
    tittel = språk(meta.tittel);
    if (tittel === "undefined") {
      tittel = meta.tittel.sn;
    }
    nivå = meta.nivå;
  }

  return (
    <div
      className={
        (aktivTab === "meny" ? "mobile_on" : "mobile_off") + " sidebar"
      }
      style={{
        zIndex: expanded && aktivTab === "kartlag" ? 20 : 1,
        height: expanded && aktivTab === "kartlag" && "auto",
        maxHeight: expanded && aktivTab === "kartlag" && "100%",
        borderBottom:
          expanded && aktivTab === "kartlag" && "2px solid $bright-nin"
      }}
    >
      <div className="sidebar_title_container sidebar_element">
        <h1 className="sidebar_title">
          Navigering
          {aktivTab === "kartlag" && (
            <button
              className="child_list_object_indicator navdropdown"
              onClick={() => {
                setExpanded(!expanded);
              }}
            >
              {expanded === true && aktivTab === "kartlag" ? (
                <KeyboardArrowDown />
              ) : (
                <KeyboardArrowUp />
              )}
            </button>
          )}
        </h1>
      </div>
      <br />
      <div
        style={{
          display: aktivTab === "kartlag" && !expanded ? "none" : "block"
        }}
      >
        {/* Top-node aka. Home-button*/}
        <button
          key="home"
          onClick={e => {
            e.stopPropagation();
            setExpanded(false);
            onNavigate("/");
          }}
          className="nav_menu_button nav_up_menu"
        >
          <Home />
          <div className="nav_text">
            <span className="nav_title">Startsiden</span>
          </div>
        </button>
        {meta && (
          <Overordnet
            overordnet={meta.overordnet}
            onNavigate={onNavigate}
            setExpanded={setExpanded}
          />
        )}
        <div className="nav_current">
          {" "}
          {meta && <Bildeavatar url={url} />}
          {tittel === "hjelp" && <HelpOutline />} {tittel}
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
      </div>
      {false && (
        <>
          <KurveContainer
            key={"a.url"}
            punkt={{
              url:
                "Biota/Plantae/Magnoliophyta/Eudicots/Ericales/Primulaceae/Primula/Scandinavica"
            }}
            gradient={{
              url:
                "Natur_i_Norge/Landskap/Landskapsgradient/Arealbruksintensitet/",
              barn: []
            }}
          >
            <Kurve logY={true} />
          </KurveContainer>
        </>
      )}
    </div>
  );
};

export default Meny;
