import React from "react";
import "style/Forvaltningsportalen.css";

const Forvaltningsportalen = props => {
  return (
    <div className="frontpage forvaltningsportalen">
      <div className="frontpage_body">
        <div
          className="frontpage_header"
          onClick={e => {
            props.history.push("/forvaltningsportalen");
          }}
        >
          <div>
            <h1>Forvaltningsportalen</h1>
            <h2>En kartløsning for KLD</h2>
          </div>
        </div>

        <div className="frontpage_feature_block">
          <div className="frontpage_feature_container">
            <h2>Hva Hvem Hvor</h2>
            <br />
            Her skriver vi en liten disclaimer etterhvet så alle vet hva dette
            er, hvor dataene kommer fra og hvem som forvalter dem
          </div>
        </div>

        <div className="form_block">
          <div className="frontpage_feature_container">
            <h2>Velg kartlag å ta med inn i kartløsningen</h2>
            <br />

            <div className="kolonne_container">
              <div className="skjema_kolonne">
                <h3>Kart fra Kartverket</h3>
                <div>
                  <input type="Checkbox" />
                  Eksempelkart
                </div>
                <div>
                  <input type="Checkbox" />
                  Eksempelkart
                </div>
                <div>
                  <input type="Checkbox" />
                  Eksempelkart
                </div>
                <div>LOGO</div>
              </div>
              <div className="skjema_kolonne">
                <h3>Verdisatt forvaltningsdata</h3>
                <div>
                  <input type="Checkbox" />
                  Eksempelkart
                </div>
                <div>
                  <input type="Checkbox" />
                  Eksempelkart
                </div>
                <div>
                  <input type="Checkbox" />
                  Eksempelkart
                </div>
                <div>LOGO</div>
              </div>
              <div className="skjema_kolonne">
                <h3>Nøytral data</h3>
                <div>
                  <input type="Checkbox" />
                  Eksempelkart
                </div>
                <div>
                  <input type="Checkbox" />
                  Eksempelkart
                </div>
                <div>
                  <input type="Checkbox" />
                  Eksempelkart
                </div>
                <div>LOGO</div>
              </div>
            </div>
          </div>
        </div>
        <div className="form_block">
          <button
            onClick={e => {
              props.history.push("/forvaltningsportalen/kart");
            }}
          >
            Gå til kart
          </button>
        </div>
      </div>

      <div className="frontpage_footer">
        <div className="frontpage_sources">
          Rammeverk laget av og disclaimer
          <br />
          <a href="https://www.artsdatabanken.no/">
            <img
              src="https://data.artsdatabanken.no/Datakilde/Artsdatabanken/logo_med_navn_408.png"
              alt="Artsdatabanken logo"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Forvaltningsportalen;