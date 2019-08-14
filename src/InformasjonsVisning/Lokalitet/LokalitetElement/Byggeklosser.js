import React from "react";
import Variabelboks from "./Variabelboks";

const Byggeklosser = ({ onNavigate, data }) => {
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
    <div className="general_badge_container wrap_padding">
      <h1>Byggeklosser</h1>
      <p>
        En gradient eller miljøvariabel er noe som endrer seg i og mellom
        områder. De er byggestenene i et område, og sammen utgjør de
        landskapstyper og naturtyper. Her finner du alle de byggeklossene som
        finnes i det valgte området.
      </p>

      <div className="blockbox">
        <h2>Landskapsgradient</h2>
        {landskap.map((kode, index) => {
          if (!data.environment[kode]) return null;
          return (
            <Variabelboks
              miljøvariabel={data.environment[kode]}
              onNavigate={onNavigate}
              kode={kode}
              key={index}
            />
          );
        })}
      </div>

      <div className="blockbox">
        <h2>Miljøvariabler for naturtyper</h2>
        {naturtype.map((kode, index) => {
          if (!data.environment[kode]) return null;
          return (
            <Variabelboks
              miljøvariabel={data.environment[kode]}
              onNavigate={onNavigate}
              kode={kode}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Byggeklosser;
