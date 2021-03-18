import React from "react";
import Overskrift from "./Overskrift";
import Landskapstype from "./Landskapstype";
import Landskapsgradienter from "./Landskapsgradienter";
import { getParentUrl } from "../AppSettings/AppFunksjoner/fetchMeta";

const Landskap = ({ landskap }) => {
  if (!landskap) return null;
  const { tittel, beskrivelse, url } = landskap;
  const gradient = landskap.gradient && landskap.gradient["NN-LA-KLG"];
  const barn = gradient && gradient.barn;
  return (
    <>
      <Overskrift
        image="Natur_i_Norge/Landskap"
        tittel="Landskap"
        subtekst="En landskapstype er en samling av variasjoner i terreng og landeformer
        som sammen påvirker et større område. I kartleggingen er den minste
        graden som måles på en kvadratkilometer. Man kan dermed befinne seg i et
        isbrelandskap uten å være akkurat på en isbre. Det vil også kunne være
        noen små variasjoner som ikke bestemmer landskapstypen da de er små og
        derav ikke dominerende."
      />

      <Landskapstype
        heading1={tittel.nb}
        heading2="Landskapstype"
        beskrivelse={beskrivelse.nb}
        parenturl={getParentUrl(landskap)}
        url={url}
        barn={barn}
      ></Landskapstype>
      <Landskapsgradienter
        heading1="Landskapsgradient"
        sample={landskap.sample}
      />
    </>
  );
};

export default Landskap;
