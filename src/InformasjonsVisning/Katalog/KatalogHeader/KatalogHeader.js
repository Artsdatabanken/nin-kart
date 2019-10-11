import React from "react";
import KatalogHeaderImage from "./KatalogHeaderImage";
import språk from "Funksjoner/språk";
import { SettingsContext } from "SettingsContext";
import KatalogInformasjon from "../KatalogInformasjon/KatalogInformasjon";
import NatursystemAdvarsel from "InformasjonsVisning/Katalog/NatursystemAdvarsel";

const KatalogHeader = ({ meta }) => {
  if (!meta) return null;
  const { nivå, onUpdateLayerProp } = meta;
  let tittel = språk(meta.tittel);
  if (tittel === "undefined") {
    tittel = "";
  }
  const vitNavn = meta.tittel.sn;
  let autoritet = null;

  let italicstitle =
    nivå === "Slekt" ||
    nivå === "Art" ||
    nivå === "Underart" ||
    nivå === "Varietet";

  if (meta.autoritet && meta.autoritet.navn && meta.autoritet.år) {
    autoritet = "(" + meta.autoritet.navn + ", " + meta.autoritet.år + ")";
    autoritet = autoritet.replace("((", "(");
  }

  /*  
  Header for alle informasjonselement aka. Boksen med bilde og tekst for denne siden.
  Inneholder navn, kode, statistikk og bilde. 

  */

  return (
    <SettingsContext.Consumer>
      {context => (
        <div className="">
          {tittel !== vitNavn ? (
            <div>
              <h1 className="sidebar_title">
                {(meta.url.includes("Biota/") ||
                  meta.url.includes("Fastlands-Norge")) && (
                  <span style={{ textTransform: "capitalize" }}></span>
                )}
                {tittel}
              </h1>
              <h2 style={{ fontStyle: italicstitle && "italic" }}>
                {vitNavn}
                {autoritet && " " + autoritet}
              </h2>
            </div>
          ) : (
            <h1 style={{ fontStyle: italicstitle && "italic" }}>
              {vitNavn}
              {autoritet && " " + autoritet}
            </h1>
          )}

          <NatursystemAdvarsel vis={meta.kart.sladd} />

          <div className="katlog_header_images_container">
            <KatalogHeaderImage meta={meta} />
            <div className="katlog_header_text_container">
              <h4>Datakilde</h4>
              <ul>
                {meta.datakilde[0].erSubset && (
                  <li>{"Er subset: " + meta.datakilde[0].erSubset}</li>
                )}
                {meta.datakilde[0].geonorgeurl && (
                  <li>
                    Geonorgeurl:
                    <a
                      href={meta.datakilde[0].geonorgeurl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {meta.datakilde[0].geonorgeurl.substring(0, 32) + "..."}
                    </a>
                  </li>
                )}
                {meta.datakilde[0].kode && (
                  <li>Kode: {meta.datakilde[0].kode}</li>
                )}
                {meta.datakilde[0].lisenskode && (
                  <li>Lisenskode: {meta.datakilde[0].lisenskode}</li>
                )}
                {språk(meta.datakilde[0].tittel) && (
                  <li>Tittel: {språk(meta.datakilde[0].tittel)}</li>
                )}
                {meta.datakilde[0].url !== "" && (
                  <li>Url: {meta.datakilde[0].url}</li>
                )}
              </ul>

              {meta.egenskap && (
                <ul>
                  <h4>Egenskaper</h4>
                  {meta.egenskap.reproduksjon.generasjonstid && (
                    <li>
                      Generasjonstid:{" "}
                      {meta.egenskap.reproduksjon.generasjonstid}
                    </li>
                  )}
                  {meta.egenskap.reproduksjon.seksuell && (
                    <li>
                      Seksuell reproduksjon:{" "}
                      {meta.egenskap.reproduksjon.seksuell}
                    </li>
                  )}
                </ul>
              )}

              {meta.farge && (
                <span>
                  Farge: {meta.farge}
                  <br />
                </span>
              )}

              {meta.lenke && meta.lenke.fab && (
                <span>
                  Fremmedartsbase:
                  <a
                    href={meta.lenke.fab}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {meta.lenke.fab.substring(0, 32) + "..."}
                  </a>
                  <br />
                </span>
              )}

              {meta.livsmiljø && (
                <span>
                  {"Livsmiljø: " + meta.livsmiljø}
                  <br />
                </span>
              )}

              {meta.risikovurdering && (
                <>
                  <h4>Risikovurdering</h4>
                  {meta.risikovurdering.arter && (
                    <span>
                      Arter: {meta.risikovurdering.arter}
                      <br />
                    </span>
                  )}

                  {meta.risikovurdering.naturtyper && (
                    <span>
                      Naturtyper: {meta.risikovurdering.naturtyper}
                      <br />
                    </span>
                  )}

                  {meta.risikovurdering.risikonivå.nå && (
                    <span>
                      Risikonivå: {meta.risikovurdering.risikonivå.nå}
                      <br />
                    </span>
                  )}
                </>
              )}

              {meta.beskrivelse && meta.beskrivelse.nob && (
                <span>
                  <b>Beskrivelse: </b>
                  {meta.beskrivelse.nob}
                  <br />
                </span>
              )}

              <KatalogInformasjon
                meta={meta}
                onUpdateLayerProp={onUpdateLayerProp}
              />
            </div>
          </div>
        </div>
      )}
    </SettingsContext.Consumer>
  );
};
export default KatalogHeader;
