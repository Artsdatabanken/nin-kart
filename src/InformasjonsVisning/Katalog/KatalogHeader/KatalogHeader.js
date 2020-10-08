import React from "react";
import KatalogHeaderImage from "./KatalogHeaderImage";
import språk from "Funksjoner/språk";
import KatalogInformasjon from "../KatalogInformasjon/KatalogInformasjon";

const KatalogHeader = ({ meta }) => {
  /*  
  Header for alle informasjonselement aka. Boksen med bilde og tekst for denne siden.
  Inneholder navn, kode, statistikk og bilde. 

  */

  if (!meta) return null;
  const { nivå, onUpdateLayerProp } = meta;
  let tittel = språk(meta.tittel);
  if (tittel === "undefined") {
    tittel = "";
  }
  const vitNavn = meta.tittel.sn;

  let autoritet = null;
  if (meta.autoritet && meta.autoritet.navn && meta.autoritet.år) {
    autoritet = "(" + meta.autoritet.navn + ", " + meta.autoritet.år + ")";
    autoritet = autoritet.replace("((", "(");
  }

  let italicstitle =
    nivå === "Slekt" ||
    nivå === "Art" ||
    nivå === "Underart" ||
    nivå === "Varietet";

  return (
    <div className="">
      {tittel !== vitNavn ? (
        <div>
          <h2 style={{ fontStyle: italicstitle && "italic" }}>
            {vitNavn}
            {autoritet && " " + autoritet}
          </h2>
        </div>
      ) : (
        <h1>
          <span style={{ textTransform: "capitalize" }}>{nivå + ": "} </span>
          <span style={{ fontStyle: italicstitle && "italic" }}>{vitNavn}</span>
          {autoritet && " " + autoritet}
        </h1>
      )}

      <KatalogHeaderImage meta={meta} />
      <KatalogInformasjon meta={meta} onUpdateLayerProp={onUpdateLayerProp} />
    </div>
  );
};
export default KatalogHeader;
