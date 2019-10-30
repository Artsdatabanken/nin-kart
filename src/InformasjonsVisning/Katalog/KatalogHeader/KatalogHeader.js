import React from "react";
import KatalogHeaderImage from "./KatalogHeaderImage";
import språk from "Funksjoner/språk";
import { SettingsContext } from "SettingsContext";
import KatalogInformasjon from "../KatalogInformasjon/KatalogInformasjon";
import NatursystemAdvarsel from "InformasjonsVisning/Katalog/NatursystemAdvarsel";

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
    <SettingsContext.Consumer>
      {context => (
        <div className="">
          {tittel !== vitNavn ? (
            <div>
              <h1 className="sidebar_title">
                {(meta.url.includes("Biota/") ||
                  meta.url.includes("Fastlands-Norge")) && (
                  <span style={{ textTransform: "capitalize" }}>
                    {nivå + ": "}{" "}
                  </span>
                )}
                {tittel}
              </h1>
              <h2 style={{ fontStyle: italicstitle && "italic" }}>
                {vitNavn}
                {autoritet && " " + autoritet}
              </h2>
            </div>
          ) : (
            <h1>
              <span style={{ textTransform: "capitalize" }}>
                {nivå + ": "}{" "}
              </span>
              <span style={{ fontStyle: italicstitle && "italic" }}>
                {vitNavn}
              </span>
              {autoritet && " " + autoritet}
            </h1>
          )}

          <NatursystemAdvarsel kode={meta.kode} />
          <KatalogHeaderImage meta={meta} />
          <KatalogInformasjon
            meta={meta}
            onUpdateLayerProp={onUpdateLayerProp}
          />
        </div>
      )}
    </SettingsContext.Consumer>
  );
};
export default KatalogHeader;
