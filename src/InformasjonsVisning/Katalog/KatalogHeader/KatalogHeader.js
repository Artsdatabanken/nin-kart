import React from "react";
import KatalogHeaderImage from "./KatalogHeaderImage";
import språk from "../../../Funksjoner/språk";
import KatalogInformasjon from "../KatalogInformasjon/KatalogInformasjon";

const KatalogHeader = ({ meta }) => {
  /*
  Header for alle informasjonselement aka. Boksen med bilde og tekst for denne siden.
  Inneholder navn, kode, statistikk og bilde.

  */

  if (!meta) return null;
  const { onUpdateLayerProp } = meta;
  let tittel = språk(meta.tittel);
  if (tittel === "undefined") {
    tittel = "Beskrivelse";
  }

  return (
    <div className="section">
      <h2>{tittel}</h2>

      <KatalogHeaderImage meta={meta} />
      <KatalogInformasjon meta={meta} onUpdateLayerProp={onUpdateLayerProp} />
    </div>
  );
};
export default KatalogHeader;
