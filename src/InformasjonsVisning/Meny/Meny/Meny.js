import React from "react";
import Overordnet from "./Navigeringsliste/Overordnet";
import KurveContainer from "GjenbruksElement/Kurver/KurveContainer";
import Navigeringsliste from "./Navigeringsliste/Navigeringsliste";
import Kurve from "GjenbruksElement/Kurver/Kurve";
import språk from "Funksjoner/språk";
import Bildeavatar from "GjenbruksElement/Bildeavatar";
import { Home, HelpOutline } from "@material-ui/icons";

const Meny = ({
  data,
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
  let tittel = "hjelp";
  let url = "/;";
  if (meta) {
    url = meta.url;
    tittel = språk(meta.tittel);
  }
  return (
    <>
      {" "}
      <div className="sidebar_title_container sidebar_element">
        <h1 className="sidebar_title">Navigering</h1>
      </div>
      <br />
      <>
        {/* Top-node aka. Home-button*/}
        <button
          key="home"
          onClick={e => {
            e.stopPropagation();
            onNavigate("");
          }}
          className="nav_menu_button nav_up_menu"
        >
          <Home />
          <div className="nav_text">
            <span className="nav_title">Startsiden</span>
          </div>
        </button>
        {meta && (
          <Overordnet overordnet={meta.overordnet} onNavigate={onNavigate} />
        )}
        <div className="nav_current">
          {" "}
          {meta && <Bildeavatar url={url} />}
          {tittel === "hjelp" && <HelpOutline />}
          {tittel}
        </div>

        <Navigeringsliste
          parentkode={meta ? meta.kode : "kode"}
          størsteAreal={data.størsteAreal}
          apidata={data.barn}
          metadata={meta && meta.barn}
          onNavigate={onNavigate}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          opplyst={opplyst}
          onUpdateMetaProp={onUpdateMetaProp}
        />
      </>
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
    </>
  );
};

export default Meny;
