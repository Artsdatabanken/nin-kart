import React from "react";

import KatalogStatistikk from "./KatalogStatistikk/KatalogStatistikk";
import språk from "../../../Funksjoner/språk";

const KatalogInformasjon = ({ meta }) => {
  /*

  Contains information giving components.

  */
  if (!meta) return null;
  const {
    prefiks,
    infoUrl,
    overordnet,
    antallNaturomrader,
    antallArter,
    stats
  } = meta;
  const mor = (overordnet.length > 0 && overordnet[0]) || { tittel: {} };
  if (prefiks !== "AO" && !!stats) {
    return (
      <div className="subsection">
        <h4>Statistikk</h4>
        <KatalogStatistikk
          prefiks={prefiks}
          overordnet={overordnet}
          tittel={språk(meta.tittel)}
          infoUrl={infoUrl}
          stats={stats}
          arealPrefix={mor.areal}
          arealVindu={antallArter}
          arterVindu={antallArter}
          geometrierVindu={antallNaturomrader}
        />
      </div>
    );
  } else {
    return null;
  }
};
export default KatalogInformasjon;
