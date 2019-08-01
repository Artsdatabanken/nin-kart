import React from "react";
import LokasjonBadge from "./LokasjonBadge";

const Landskapstype = ({ onNavigate, data }) => {
  let naturtype = [];
  let landskap = [];
  const miljvar = Object.keys(data.environment).sort();
  for (let i in miljvar) {
    const miljøvariabelkode = miljvar[i].substring(0, 5);
    if (miljøvariabelkode === "NN-NA") {
      naturtype.push(miljvar[i]);
    } else if (miljøvariabelkode === "NN-LA") {
      landskap.push(miljvar[i]);
    }
  }

  return (
    <div className="">
      <h2>Test i mellomtiden</h2>
      {naturtype.map((kode, index) => {
        if (!data.environment[kode]) return null;
        const miljøvariabel = data.environment[kode];
        const barn = miljøvariabel.barn;
        return (
          <div className="landskapstype_visning">
            <h3>Navn på landskapstype her</h3>
            <img src={miljøvariabel.bilde.foto.url} alt="" />

            <div className="lokasjon_badge_container">
              {barn &&
                barn.map((value, index) => {
                  return (
                    <LokasjonBadge
                      value={value}
                      index={index}
                      onNavigate={onNavigate}
                    />
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Landskapstype;
