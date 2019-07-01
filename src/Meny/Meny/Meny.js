import React from "react";
import Overordnet from "./Navigeringsliste/Overordnet";
import { KeyboardArrowDown } from "@material-ui/icons/";
import Ekspander from "GjenbruksElement/Ekspander";
import KurveContainer from "GjenbruksElement/Kurver/KurveContainer";
import Navigeringsliste from "./Navigeringsliste/Navigeringsliste";
import Kurve from "GjenbruksElement/Kurver/Kurve";
import språk from "Funksjoner/språk";
import Bildeavatar from "GjenbruksElement/Bildeavatar";
import { Home } from "@material-ui/icons";

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
  if (!meta) return null;
  const { overordnet, kode } = meta;
  const tittel = språk(meta.tittel);
  return (
    <>
      <Ekspander
        visible={true}
        is_expanded={true}
        heading={"Naviger"}
        icon={<KeyboardArrowDown />}
      >
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
          <Overordnet overordnet={overordnet} onNavigate={onNavigate} />
          <div className="nav_current">
            {" "}
            <Bildeavatar url={meta.url} /> {tittel}
          </div>

          <Navigeringsliste
            parentkode={kode}
            størsteAreal={data.størsteAreal}
            apidata={data.barn}
            metadata={meta.barn}
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
      </Ekspander>
    </>
  );
};

export default Meny;
