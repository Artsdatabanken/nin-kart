import React from "react";
import KatalogHeaderImage from "./KatalogHeaderImage";
import språk from "Funksjoner/språk";
import prettyKode from "Funksjoner/prettyKode";
import { SettingsContext } from "SettingsContext";
import KatalogInformasjon from "../KatalogInformasjon/KatalogInformasjon";
import NatursystemAdvarsel from "InformasjonsVisning/Katalog/NatursystemAdvarsel";

const KatalogHeader = ({ meta }) => {
  if (!meta) return null;
  const { kode, nivå, onUpdateLayerProp, overordnet } = meta;
  const pkode = prettyKode(kode);
  let tittel = språk(meta.tittel);
  if (tittel === "undefined") {
    tittel = "";
  }
  const vitNavn = meta.tittel.sn;

  let autoritet = "";

  let taksonomi = "";
  let slekt = "";

  if (meta.autoritet && meta.autoritet.navn && meta.autoritet.år) {
    autoritet = meta.autoritet.navn + ", " + meta.autoritet.år;
  }

  if (meta.url.includes("Biota")) {
    for (let i = overordnet.length - 2; i >= 0; i--) {
      if (
        overordnet[i].nivå === "Slekt" ||
        overordnet[i].nivå === "Art" ||
        overordnet[i].nivå === "Underart" ||
        overordnet[i].nivå === "Varietet"
      ) {
        slekt =
          slekt +
          "\n" +
          overordnet[i].nivå +
          ": " +
          språk(overordnet[i].tittel);
      } else {
        taksonomi =
          taksonomi +
          "\n" +
          overordnet[i].nivå +
          ": " +
          språk(overordnet[i].tittel);
      }
    }
  }

  /*  
  Header for alle informasjonselement aka. Boksen med bilde og tekst for denne siden.
  Inneholder navn, kode, statistikk og bilde. 

  */

  return (
    <SettingsContext.Consumer>
      {context => (
        <div className="">
          {tittel !== vitNavn && (
            <div className="">
              <h1 className="sidebar_title">
                {(meta.url.includes("Biota/") ||
                  meta.url.includes("Fastlands-Norge")) && (
                  <span style={{ textTransform: "capitalize" }}>
                    {nivå + ": "}{" "}
                  </span>
                )}
                {tittel}
              </h1>
              {nivå === "Slekt" ||
              nivå === "Art" ||
              nivå === "Underart" ||
              nivå === "Varietet" ? (
                <h2>
                  <i>{vitNavn}</i>
                </h2>
              ) : (
                <h2>{vitNavn}</h2>
              )}
            </div>
          )}

          {tittel === vitNavn && (
            <div className="">
              <h1 className="sidebar_title">
                <span>{nivå + ": "} </span>
                {nivå === "Slekt" ||
                nivå === "Art" ||
                nivå === "Underart" ||
                nivå === "Varietet" ? (
                  <i>{vitNavn}</i>
                ) : (
                  vitNavn
                )}
              </h1>
            </div>
          )}

          <NatursystemAdvarsel vis={meta.kart.sladd} />

          <div className="katlog_header_images_container">
            <KatalogHeaderImage meta={meta} />
            <div className="katlog_header_text_container">
              {taksonomi !== "" && (
                <div className="taxonomy">
                  {taksonomi}
                  {slekt !== "" && <i>{slekt}</i>}
                </div>
              )}

              <p>
                {autoritet !== "" && (
                  <>
                    <span>{"Autor: " + autoritet}</span>
                    <br></br>
                  </>
                )}

                {meta.autorkode && (
                  <>
                    <span>{"Autorkode: " + meta.autorkode}</span>
                    <br></br>
                  </>
                )}
              </p>

              <p>
                <span>Datakilde</span>
                <br></br>
                {meta.datakilde[0].erSubset && (
                  <>
                    <span>{"Er subset: " + meta.datakilde[0].erSubset}</span>
                    <br></br>
                  </>
                )}
                {meta.datakilde[0].geonorgeurl && (
                  <>
                    <span>
                      {"Geonorgeurl: "}
                      <a
                        href={meta.datakilde[0].geonorgeurl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {meta.datakilde[0].geonorgeurl.substring(0, 32) + "..."}
                      </a>
                    </span>
                    <br></br>
                  </>
                )}
                {meta.datakilde[0].kode && (
                  <>
                    <span>{"Kode: " + meta.datakilde[0].kode}</span>
                    <br></br>
                  </>
                )}
                {meta.datakilde[0].lisenskode && (
                  <>
                    <span>{"Lisenskode: " + meta.datakilde[0].lisenskode}</span>
                    <br></br>
                  </>
                )}
                {språk(meta.datakilde[0].tittel) && (
                  <>
                    <span>{"Tittel: " + språk(meta.datakilde[0].tittel)}</span>
                    <br></br>
                  </>
                )}
                {meta.datakilde[0].url !== "" && (
                  <>
                    <span>{"Url: " + meta.datakilde[0].url}</span>
                    <br></br>
                  </>
                )}
              </p>

              <p>
                {meta.egenskap && (
                  <>
                    <span>Egenskaper</span>
                    <br></br>
                    {meta.egenskap.reproduksjon.generasjonstid && (
                      <>
                        <span>
                          {"Generasjonstid: " +
                            meta.egenskap.reproduksjon.generasjonstid}
                        </span>
                        <br></br>
                      </>
                    )}
                    {meta.egenskap.reproduksjon.seksuell && (
                      <>
                        <span>
                          {"Seksuell reproduksjon: " +
                            meta.egenskap.reproduksjon.seksuell}
                        </span>
                        <br></br>
                      </>
                    )}
                  </>
                )}
              </p>

              <p>
                {meta.farge && (
                  <>
                    <span>{"Farge: " + meta.farge}</span>
                    <br></br>
                  </>
                )}

                {meta.lenke && meta.lenke.fab && (
                  <>
                    <span>
                      {"Fremmedartsbase: "}
                      <a
                        href={meta.lenke.fab}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {meta.lenke.fab.substring(0, 32) + "..."}
                      </a>
                    </span>
                    <br></br>
                  </>
                )}

                {meta.livsmiljø && (
                  <>
                    <span>{"Livsmiljø: " + meta.livsmiljø}</span>
                    <br></br>
                  </>
                )}
              </p>
              <p>
                {meta.risikovurdering && (
                  <>
                    <span>Risikovurdering</span>
                    <br></br>
                    {meta.risikovurdering.arter && (
                      <>
                        <span>{"Arter: " + meta.risikovurdering.arter}</span>
                        <br></br>
                      </>
                    )}

                    {meta.risikovurdering.naturtyper && (
                      <>
                        <span>
                          {"Naturtyper: " + meta.risikovurdering.naturtyper}
                        </span>
                        <br></br>
                      </>
                    )}

                    {meta.risikovurdering.risikonivå.nå && (
                      <>
                        <span>
                          {"Risikonivå: " + meta.risikovurdering.risikonivå.nå}
                        </span>
                        <br></br>
                      </>
                    )}
                  </>
                )}
              </p>
              <p>
                {meta.beskrivelse && meta.beskrivelse.nob && (
                  <>
                    <span>
                      <b>Beskrivelse: </b>
                      {meta.beskrivelse.nob}
                    </span>
                    <br></br>
                  </>
                )}
              </p>

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
