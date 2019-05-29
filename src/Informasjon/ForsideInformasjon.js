import React, { useState } from "react";
import { withRouter } from "react-router";
import ".././style/Informasjon.css";

const ForsideInformasjon = props => {
  const [showInfo, setShowInfo] = useState(true);
  if (props.location.pathname !== "/") return null;
  if (props.location.pathname !== "/") return null;
  return (
    <React.Fragment>
      {showInfo !== "turn off" && (
        <div
          className="info_component"
          onClick={() => {
            props.history.push("/Natur_i_Norge/Landskap/");
            setShowInfo(false);
          }}
        >
          <div className="infoBox">
            <div className="top_image">
              <img
                src="https://www.artsdatabanken.no/Files/20973"
                alt="Artsdatabanken logo"
              />
            </div>
            <button className="close_button">X</button>
            <div className="container_padding">
              <h1>Velkommen til Natur i Norge</h1>
              <h2>NiN - Kart Versjon 1.0</h2>
              <button className="mobile_close_button">Gå til kart</button>
              <div className="ingress">
                Natur i Norge (NiN) er et type- og beskrivelsessystem for all
                variasjon i naturen. NiN håndterer variasjonen i alle naturmiljø
                i Norge, fra de store havdyp til de høyeste fjell, og fra
                Skagerrak i sør til Svalbard og Polhavet i nord. NiN håndterer
                også naturvariasjonen på ulike skala gjennom de såkalte
                «Naturmangfoldnivåene», fra storskala Landskapstyper til alle
                livsmedier ned til barken på et tre. Les mer om prosjektet{" "}
                <a href="https://www.artsdatabanken.no/NiN">
                  på nettsidene våre.
                </a>
              </div>
              <div className="infoItemContainer">
                <div className="infoItem">
                  <h3>Slå opp landskap og natursystem</h3>
                  <img
                    src="https://data.artsdatabanken.no/Natur_i_Norge/Landskap/forside_408.jpg"
                    alt="Landskap og natursystem"
                  />
                  <p>
                    Hvis du klikker i søkefeltet kan du velge landskap eller
                    natursystem, og navigere deg videre for å se det markert i
                    kartet. Under hierarki kan du flytte deg dypere og dypere
                    inn i systemet, og fargeindikatorene under natursystem vil
                    vise deg hva som er vist i kartet.
                  </p>
                </div>
                <div className="infoItem">
                  <h3>Finn informasjon om et område</h3>
                  <img
                    src="https://data.artsdatabanken.no/Natur_i_Norge/Landskap/Landskapsgradient/V%C3%A5tmarkspreg/forside_950.jpg"
                    alt="Finn info"
                  />
                  <p>
                    Ved å klikke på kartet kan du sette en markør, og få opp
                    informasjon om det valgte området.
                  </p>
                </div>
                {/*}
                <div className="infoItem">
                  <h3>Statistikk over landskapsgradient</h3>
                  <img
                    src="https://www.artsdatabanken.no/Media/F21301?mode=320x320"
                    alt="Landskapsgradient"
                  />
                  <p>
                    Hvis du velger en art og klikker på aktiver vil du få opp
                    statistikk for denne arten når du videre navigerer deg inn
                    på de forskjellige landskapsgradientene.
                  </p>
                </div>
                */}
              </div>

              <div className="infoItemContainer sourceContainer">
                <h2>Dataleverandører</h2>
                <div>
                  <img
                    src="https://data.artsdatabanken.no/Datakilde/Artsdatabanken/forside_408.png"
                    alt="logo for artsdatabanken"
                  />
                  <br />
                  Artsdatabanken
                </div>
                <div>
                  <img
                    src="https://data.artsdatabanken.no/Datakilde/Milj%C3%B8direktoratet/forside_408.png"
                    alt="logo for miljødirektoratet"
                  />
                  <br />
                  Miljødirektoratet
                </div>
                <div>
                  <img
                    src="https://data.artsdatabanken.no/Datakilde/Kartverket/forside_408.png"
                    alt="logo for kartverket"
                  />
                  <br />
                  Kartverket
                </div>
                <div>
                  <img
                    src="https://data.artsdatabanken.no/Datakilde/Norsk_institutt_for_naturforskning/forside_408.png"
                    alt="logo for nina"
                  />
                  <br />
                  NINA
                </div>
                <div>
                  <img
                    src="https://data.artsdatabanken.no/Datakilde/Norsk_institutt_for_bio%C3%B8konomi/forside_408.png"
                    alt="logo for nibio"
                  />
                  <br />
                  NIBIO
                </div>
                <div>
                  <img
                    src="https://data.artsdatabanken.no/Datakilde/Norges_Geologiske_Unders%C3%B8kelse/forside_408.png"
                    alt="logo for ngu"
                  />
                  <br />
                  NGU
                </div>
                <div>
                  <img
                    src="https://data.artsdatabanken.no/Datakilde/Statistisk_sentralbyr%C3%A5/forside_408.png"
                    alt="logo for ssb"
                  />
                  <br />
                  SSB
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default withRouter(ForsideInformasjon);
