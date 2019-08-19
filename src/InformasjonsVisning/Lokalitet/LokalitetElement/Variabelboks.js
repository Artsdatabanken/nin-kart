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

  let avrundetvariabel = roundToTwo(miljøvariabel.v);
  return (
    <>
      <div className="landskapstype_visning">
        <h3>
          {miljøvariabel.tittel && miljøvariabel.tittel.nb} - {kode}
        </h3>
        {miljøvariabel.ingress}
        <br />
        {avrundetvariabel} {miljøvariabel["måleenhet"]}
        <br />
        {found && (
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
        )}
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
};

export default Variabelboks;
