import React from "react";
import Overordnet from "./Overordnet";
import { CallSplit, MergeType } from "@material-ui/icons/";
import Ekspander from "GjenbruksElement/Ekspander";
import KurveContainer from "Kodetre/Kodeliste/KurveContainer";
import Kodeliste from "Kodetre/Kodeliste/Kodeliste";
import Kurve from "Kodetre/Kodeliste/Kurve";
import språk from "Funksjoner/språk";

const KatalogNavigering = ({
  data,
  meta,
  onNavigate,
  onUpdateMetaProp,
  opplyst,
  onMouseEnter,
  onMouseLeave
}) => {
  /*
  
  Currently only availiable for Landskap/Typeinndeling
  
  */
  const { overordnet, kode } = meta;
  //const tittel = språk(meta.tittel);
  return (
    <>
      <Ekspander
        visible={overordnet.length > 0}
        icon={<MergeType style={{ transform: "rotate(-45deg)" }} />}
        heading="Hierarki"
        heading2={overordnet.length}
      >
        <Overordnet overordnet={overordnet} onNavigate={onNavigate} />
        {/* <h3> > {tittel}</h3>*/}
      </Ekspander>
      <Ekspander
        visible={meta.barn.length > 0}
        heading={meta.undernivå}
        heading2={meta.barn.length}
        icon={<CallSplit style={{ transform: "rotate(180deg)" }} />}
      >
        {false && (
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
        )}

        <Kodeliste
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
      </Ekspander>
    </>
  );
};

export default KatalogNavigering;
