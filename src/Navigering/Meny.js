import React, { useState } from "react";
import Overordnet from "./Navigeringsliste/Overordnet";
import Navigeringsliste from "./Navigeringsliste/Navigeringsliste";
import språk from "Funksjoner/språk";
import isItalics from "Funksjoner/isItalics";
import Bildeavatar from "GjenbruksElement/Bildeavatar";
import { Home, Room, HelpOutline } from "@material-ui/icons";

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
  let overordnet_url = "";
  let sn = "";
  let url = "/;";
  let overordnet = [];
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

  if (lokalitet.includes("lokalitet") && lokalitetdata) {
    if (lokalitetdata.kommune && lokalitetdata.kommune.url) {
      overordnet = lokalitetdata.kommune.url.replace("_", " ").split("/");
    } else {
      console.warn("ingen kommune, se etter andre ting");
    }
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

function HomeButton({ setExpanded, onNavigate }) {
  return (
    <button
      key="home"
      onClick={(e) => {
        e.stopPropagation();
        setExpanded(false);
        onNavigate("/");
      }}
      className="nav_menu_button nav_up_menu"
    >
      {false && <Home style={{ color: "#777" }} />}
      <div className="nav_text">
        <span className="nav_title">▾ Startsiden</span>
      </div>
    </button>
  );
}

function OverordnetMapping({
  overordnet,
  overordnet_url,
  setExpanded,
  onNavigate,
}) {
  console.log({ overordnet });
  return (
    <>
      {overordnet.map((item, i) => {
        //if (item === "") return null;
        overordnet_url += "/" + item.replace(" ", "_");
        return (
          <button
            key={item}
            onClick={(e) => {
              setExpanded(false);
              onNavigate(overordnet_url);
            }}
            className="nav_menu_button nav_up_menu"
          >
            <Room />
            <div className="nav_text">
              <span className="nav_title">{item}</span>
            </div>
          </button>
        );
      })}
    </>
  );
}

export default Meny;
