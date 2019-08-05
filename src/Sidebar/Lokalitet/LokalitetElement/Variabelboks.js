import React from "react";
import { ArrowRight } from "@material-ui/icons";
import LokasjonBadge from "./LokasjonBadge";

const Variabelboks = ({ onNavigate, miljøvariabel, kode }) => {
  const barn = miljøvariabel.barn;

  let found;
  for (let i in barn) {
    if (barn[i].aktiv === true) {
      found = true;
    }
  }

  if (found !== true) return null;
  return (
    <div className="general_badge_item">
      <h3>
        {miljøvariabel.tittel && miljøvariabel.tittel.nb} - {kode}
      </h3>
      {miljøvariabel.ingress}
      <span
        onClick={() => {
          onNavigate(miljøvariabel.url);
        }}
      >
        {" "}
        Les mer... <ArrowRight />
      </span>
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
