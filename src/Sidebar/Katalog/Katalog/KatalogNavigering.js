import React from "react";
import Overordnet from "./Navigeringsliste/Overordnet";
import KurveContainer from "GjenbruksElement/Kurver/KurveContainer";
import Navigeringsliste from "./Navigeringsliste/Navigeringsliste";
import Kurve from "GjenbruksElement/Kurver/Kurve";
import språk from "Funksjoner/språk";
import Bildeavatar from "GjenbruksElement/Bildeavatar";

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
  
Navigation
  
  */
  const { overordnet, kode } = meta;
  const tittel = språk(meta.tittel);
  return (
    <>
      <h1>Navigering</h1>
      <>
        <Overordnet overordnet={overordnet} onNavigate={onNavigate} />
        <div className="nav_current">
          {" "}
          <Bildeavatar url={meta.url} /> {tittel}
        </div>

        <Navigeringsliste
          title=""
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
    </>
  );
};

export default Meny;
