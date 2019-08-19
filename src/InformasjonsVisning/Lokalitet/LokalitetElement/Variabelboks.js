import React from "react";
import LokasjonBadge from "./LokasjonBadge";

function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

const Variabelboks = ({ onNavigate, miljøvariabel }) => {
  if (!miljøvariabel) return null;
  const barn = miljøvariabel.barn;
  let kode = miljøvariabel.kode;
  let found;
  for (let i in barn) {
    if (barn[i].aktiv === true) {
      found = true;
    }
  }

  if (found !== true) {
    let avrundetvariabel = roundToTwo(miljøvariabel.v);
    return (
      <>
        <div className="general_badge_item small">
          <h3>
            {miljøvariabel.tittel && miljøvariabel.tittel.nb} - {kode}
          </h3>
          {avrundetvariabel} {miljøvariabel["måleenhet"]}
          <br />
          <button
            onClick={() => {
              onNavigate(miljøvariabel.url);
            }}
          >
            Gå til informasjonsside
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="general_badge_item">
      <h3>
        {miljøvariabel.tittel && miljøvariabel.tittel.nb} - {kode}
      </h3>
      {miljøvariabel.ingress}{" "}
      <button
        onClick={() => {
          onNavigate(miljøvariabel.url);
        }}
      >
        Les mer >
      </button>
      <br />
      <div className="lokasjon_badge_container">
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
    </div>
  );
};

export default Variabelboks;
