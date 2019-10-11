import React from "react";
import LokasjonBadge from "./LokasjonBadge";
import språk from "Funksjoner/språk";

function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

const Variabelboks = ({ onNavigate, miljøvariabel }) => {
  if (!miljøvariabel) return null;
  const barn = miljøvariabel.barn;
  let kode = miljøvariabel.kode;
  let found;
  for (var i in barn) {
    if (barn[i].aktiv === true) {
      found = true;
    }
  }
  let avrundetvariabel = roundToTwo(miljøvariabel.v);

  return (
    <>
      <div
        className={
          miljøvariabel.bilde && miljøvariabel.bilde.foto
            ? "landskapstype_visning"
            : "landskapstype_visning small"
        }
      >
        <div className="not_image_and_link">
          <h2>
            {miljøvariabel.tittel && språk(miljøvariabel.tittel)} - {kode}
          </h2>
          {miljøvariabel.beskrivelse && (
            <p>{språk(miljøvariabel.beskrivelse)}</p>
          )}
          <br />
          {found && (
            <div className="not_image_and_link lokasjon_badge_container">
              {barn &&
                barn.map((value, index) => {
                  return (
                    <LokasjonBadge
                      value={value}
                      index={index}
                      onNavigate={onNavigate}
                      key={index}
                    />
                  );
                })}
            </div>
          )}
        </div>
        <div className="image_and_link">
          {miljøvariabel.bilde && miljøvariabel.bilde.foto && (
            <img
              src={miljøvariabel.bilde.foto.url}
              onClick={() => {
                onNavigate(miljøvariabel.url);
              }}
              className="hide_on_mobile"
              alt=""
            />
          )}

          {miljøvariabel["måleenhet"] && (
            <div className="value_lokasjon">
              {avrundetvariabel} {miljøvariabel["måleenhet"]}
            </div>
          )}

          <button
            className="lokasjonboksknapper"
            onClick={() => {
              onNavigate(miljøvariabel.url);
            }}
          >
            Gå til informasjonsside
          </button>
        </div>
      </div>
    </>
  );
};

export default Variabelboks;
