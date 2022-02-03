import React from "react";
import KatalogHeaderImage from "./KatalogHeaderImage";
import språk from "../../../Funksjoner/språk";
import KatalogInformasjon from "../KatalogInformasjon/KatalogInformasjon";
import KatalogInformasjonsBoks from "../KatalogInformasjon/KatalogInformasjonsBoks";

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
    <>
      <h3>{tittel}</h3>
      <KatalogHeaderImage meta={meta} />

      <KatalogInformasjonsBoks meta={meta} />

      <KatalogInformasjon meta={meta} onUpdateLayerProp={onUpdateLayerProp} />
    </>
  );
};
export default KatalogHeader;
