import React from "react";
import Variabelboks from "./Variabelboks";

const Byggeklosser = ({ onNavigate, data }) => {
  let naturtype = [];
  let landskap = [];
  let miljøvariabler = data.environment;
  let found_landskap = false;
  let found_natur = false;
  const miljvar = Object.keys(miljøvariabler).sort();

  for (let i in miljvar) {
    const miljøvariabelkode = miljvar[i].substring(0, 5);
    if (miljøvariabelkode === "NN-NA") {
      found_natur = true;
      naturtype.push(miljøvariabler[miljvar[i]]);
    } else if (miljøvariabelkode === "NN-LA") {
      found_landskap = true;
      landskap.push(miljøvariabler[miljvar[i]]);
    } else {
      console.log(
        "ekskluderer disse da de ikke er klassifisert",
        miljøvariabler[miljvar[i]]
      );
    }
  }

  if (!found_landskap && !found_natur) return null;

  return (
    <div className="general_badge_container wrap_padding lokasjon_seksjon">
      <div className="landscape_wrap_2ndlayer">
        <h1>Byggeklosser</h1>
        <p>
          En gradient eller miljøvariabel er noe som endrer seg i og mellom
          områder. De er byggestenene i et område, og sammen utgjør de
          landskapstyper og naturtyper. Her finner du alle de byggeklossene som
          finnes i det valgte området.
        </p>

        {found_landskap && (
          <div class="flex">
            <h2>Landskapsgradient</h2>
            {landskap.map((milv, index) => {
              return (
                <>
                  <Variabelboks
                    miljøvariabel={milv}
                    onNavigate={onNavigate}
                    key={index}
                  />
                </>
              );
            })}
          </div>
        )}
        {found_natur && (
          <div class="flex">
            <h2>Miljøvariabler for naturtyper</h2>
            {naturtype.map((milv, index) => {
              return (
                <Variabelboks
                  miljøvariabel={milv}
                  onNavigate={onNavigate}
                  key={index}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Byggeklosser;
