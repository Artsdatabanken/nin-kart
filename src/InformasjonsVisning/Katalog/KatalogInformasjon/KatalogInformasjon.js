import React from "react";
import KatalogInformasjonsBoks from "./KatalogInformasjonsBoks";
import KatalogStatistikk from "InformasjonsVisning/Katalog/KatalogInformasjon/KatalogStatistikk/KatalogStatistikk";
import språk from "Funksjoner/språk";

const KatalogInformasjon = ({ meta }) => {
  /*
  
  Contains information giving components.
  
  */
  if (!meta) return null;
  const {
    //kode,
    //depth,
    prefiks,
    infoUrl,
    overordnet,
    antallNaturomrader,
    antallArter,
    stats
  } = meta;
  const mor = (overordnet.length > 0 && overordnet[0]) || { tittel: {} };

  return (
    <>
      {/*kode === "NN-LA-TI" && (
        <Detaljeringsgrad onUpdateLayerProp={onUpdateLayerProp} value={depth} />
      )*/}
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
    </>
  );
};
export default KatalogInformasjon;
