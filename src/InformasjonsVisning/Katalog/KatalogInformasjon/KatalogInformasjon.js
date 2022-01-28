import React from "react";
import KatalogInformasjonsBoks from "./KatalogInformasjonsBoks";
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

  return (
    <div className="subsection">
      <KatalogInformasjonsBoks meta={meta} />
      {prefiks !== "AO" && !!stats && (
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
      )}
    </div>
  );
};
export default KatalogInformasjon;
