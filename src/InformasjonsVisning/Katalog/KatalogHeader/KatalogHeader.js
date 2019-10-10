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
  let barn = "";
  let beskrivelse = "";
  let bilde = "";
  let datakilde = "";
  let erSubset = false;
  let geonorgeurl = "";
  let datakildekode = "";
  let lisenskode = "";
  let datakildetittel = "";
  let datakildeurl = "";
  let egenskap = "";
  let farge = "";
  let graf = "";
  let kart = "";
  let lenke = "";
  let miljo = "";
  let risikovurdering = "";

  let taksonomi = "";
  let slekt = "";

  if (meta.autoritet && meta.autoritet.navn && meta.autoritet.år) {
    autoritet = meta.autoritet.navn + ", " + meta.autoritet.år;
  }

  if (meta.barn) {
    barn = meta.barn;
  }

  if (meta.beskrivelse && meta.beskrivelse.nob) {
    beskrivelse = meta.beskrivelse.nob;
  }

  if (meta.bilde && meta.bilde.logo) {
    bilde = meta.bilde.logo;
  }

  if (meta.datakilde) {
    datakilde = meta.datakilde;
    if (meta.datakilde[0].erSubset) {
      erSubset = meta.datakilde[0].erSubset;
    }
    if (meta.datakilde[0].geonorgeurl) {
      geonorgeurl = meta.datakilde[0].geonorgeurl;
    }
    if (meta.datakilde[0].kode) {
      datakildekode = meta.datakilde[0].kode;
    }
    if (meta.datakilde[0].lisenskode) {
      lisenskode = meta.datakilde[0].lisenskode;
    }
    if (meta.datakilde[0].tittel.nb) {
      datakildetittel = meta.datakilde[0].tittel.nb;
    }
    if (meta.datakilde[0].url) {
      datakildeurl = meta.datakilde[0].url;
    }
  }

  if (meta.egenskap) {
    egenskap = meta.egenskap;
  }

  if (meta.farge) {
    farge = meta.farge;
  }

  if (meta.graf) {
    graf = meta.graf;
    console.log(graf);
  }

  if (meta.kart) {
    kart = meta.kart;
    console.log(kart);
  }

  if (meta.lenke && meta.lenke.fab) {
    lenke = meta.lenke.fab;
  }

  if (meta.livsmiljø) {
    miljo = meta.livsmiljø;
  }

  if (meta.risikovurdering) {
    risikovurdering = meta.risikovurdering;
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
                    <br />
                  </>
                )}

                {meta.autorkode && (
                  <>
                    <span>{"Autorkode: " + meta.autorkode}</span>
                  </>
                )}

                {barn.length > 0 && (
                  <>
                    <span>{"Barn: " + barn}</span>
                    <br></br>
                  </>
                )}

                {bilde !== "" && (
                  <>
                    <span>{"Bilde: " + bilde}</span>
                    <br></br>
                  </>
                )}
              </p>

              {datakilde && (
                <p>
                  Datakilde<br></br>
                  {erSubset && (
                    <>
                      <span>{"Er subset: " + erSubset}</span>
                      <br></br>
                    </>
                  )}
                  {geonorgeurl !== "" && (
                    <>
                      <span>
                        {"Geonorgeurl: "}
                        <a
                          href={geonorgeurl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {geonorgeurl.substring(0, 32) + "..."}
                        </a>
                      </span>
                      <br></br>
                    </>
                  )}
                  {datakildekode !== "" && (
                    <>
                      <span>{"Kode: " + datakildekode}</span>
                      <br></br>
                    </>
                  )}
                  {lisenskode !== "" && (
                    <>
                      <span>{"Lisenskode: " + lisenskode}</span>
                      <br></br>
                    </>
                  )}
                  {datakildetittel !== "" && (
                    <>
                      <span>{"Tittel: " + datakildetittel}</span>
                      <br></br>
                    </>
                  )}
                  {datakildeurl !== "" && (
                    <>
                      <span>{"Url: " + datakildeurl}</span>
                      <br></br>
                    </>
                  )}
                </p>
              )}

              <p>
                {egenskap && (
                  <>
                    <span>Egenskaper</span>
                    <br></br>
                    <span>
                      {"Generasjonstid: " +
                        egenskap.reproduksjon.generasjonstid}
                    </span>
                    <br></br>
                  </>
                )}
              </p>

              <p>
                {farge !== "" && (
                  <>
                    <span>{"Farge: " + farge}</span>
                    <br></br>
                  </>
                )}

                {graf.length > 0 && (
                  <>
                    <span>{"Graf: " + graf}</span>
                    <br></br>
                  </>
                )}

                {kart !== "" && (
                  <>
                    <span>{"Kart: " + kart}</span>
                    <br></br>
                  </>
                )}

                {lenke !== "" && (
                  <>
                    <span>
                      {"Fremmedartsbase: "}
                      <a href={lenke} target="_blank" rel="noopener noreferrer">
                        {lenke.substring(0, 32) + "..."}
                      </a>
                    </span>
                    <br></br>
                  </>
                )}

                {miljo !== "" && (
                  <>
                    <span>{"Livsmiljø: " + miljo}</span>
                    <br></br>
                  </>
                )}
              </p>
              <p>
                {risikovurdering !== "" && (
                  <>
                    <span>Risikovurdering</span>
                    <br></br>
                    {risikovurdering.arter && (
                      <>
                        <span>{"Arter: " + risikovurdering.arter}</span>
                        <br></br>
                      </>
                    )}

                    {risikovurdering.naturtyper && (
                      <>
                        <span>
                          {"Naturtyper: " + risikovurdering.naturtyper}
                        </span>
                        <br></br>
                      </>
                    )}

                    {risikovurdering.risikonivå.nå && (
                      <>
                        <span>
                          {"Risikonivå: " + risikovurdering.risikonivå.nå}
                        </span>
                        <br></br>
                      </>
                    )}
                  </>
                )}
              </p>

              <p>
                {beskrivelse !== "" && (
                  <>
                    <b>Beskrivelse:</b> {beskrivelse}
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
