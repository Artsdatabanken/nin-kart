import React from "react";
import Landskapstype from "./Landskapstype";

const Landskapstypefordeling = ({ onNavigate, data, landskap }) => {
  return (
    <>
      <div className="landscape_divisions wrap_padding">
        <h1>Landskapstype</h1>

        <div className="landscape_wrap_2ndlayer">
          <p>
            En landskapstype er en samling av variasjoner i terreng og
            landeformer som sammen påvirker et større område. I kartleggingen er
            den minste graden som måles på en kvadratkilometer. Man kan dermed
            befinne deg i et isbrelandskap uten å være akkurat på en isbre. Det
            vil også kunne være noen små variasjoner som ikke bestemmer
            landskapstypen da de er små og derav ikke dominerende.
          </p>

          {data && (
            <Landskapstype
              data={data}
              onNavigate={onNavigate}
              newlandskap={landskap}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Landskapstypefordeling;
