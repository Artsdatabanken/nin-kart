import React from "react";
import KatalogHeaderImage from "./KatalogHeaderImage";
import språk from "../../../Funksjoner/språk";
import KatalogInformasjonsBoks from "../KatalogInformasjon/KatalogInformasjonsBoks";
import KatalogStatistikk from "../KatalogInformasjon/KatalogStatistikk/KatalogStatistikk";
const KatalogHeader = ({ meta }) => {
  /*
  Header for alle informasjonselement aka. Boksen med bilde og tekst for denne siden.
  Inneholder navn, kode, statistikk og bilde.
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
  let tittel = språk(meta.tittel);
  if (tittel === "undefined") {
    tittel = "Beskrivelse";
  }
  const mor = (overordnet.length > 0 && overordnet[0]) || { tittel: {} };

  return (
    <>
      <h3>{tittel}</h3>
      <KatalogHeaderImage meta={meta} />
      <KatalogInformasjonsBoks meta={meta} />
      {prefiks !== "AO" && !!stats && (
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
      )}
    </>
  );
};
export default KatalogHeader;
