import React from "react";
import Overordnet from "./Navigeringsliste/Overordnet";
import { MergeType } from "@material-ui/icons/";
import Ekspander from "GjenbruksElement/Ekspander";
import KurveContainer from "GjenbruksElement/Kurver/KurveContainer";
import Navigeringsliste from "./Navigeringsliste/Navigeringsliste";
import Kurve from "GjenbruksElement/Kurver/Kurve";
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
  
Navigation
  
  */
  const { overordnet, kode } = meta;
  const tittel = språk(meta.tittel);
  return (
    <>
      <Ekspander
        visible={overordnet.length > 0}
        icon={<MergeType style={{ transform: "rotate(-45deg)" }} />}
        heading="Navigering"
        heading2={overordnet.length}
      >
        <>
          <Overordnet overordnet={overordnet} onNavigate={onNavigate} />
          <h3> > {tittel}</h3>

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
      </Ekspander>
    </>
  );
};

export default KatalogNavigering;
