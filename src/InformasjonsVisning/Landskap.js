import React from "react";
import Landskapstype from "./Landskapstype";
import Landskapsgradienter from "./Landskapsgradienter";
import { getParentUrl } from "../AppSettings/AppFunksjoner/fetchMeta";
import { Landscape } from "@material-ui/icons";
import { Card } from "@material-ui/core";

const Landskap = ({ landskap }) => {
  if (!landskap) return null;
  const { tittel, beskrivelse, url } = landskap;
  const gradient = landskap.gradient && landskap.gradient["NN-LA-KLG"];
  const barn = gradient && gradient.barn;
  return (
    <div className="section">
      <h3 class="kartlag_header">
        <Landscape />
        Landskap
      </h3>

      <Card className="nin-card">
        <p>
          En landskapstype er en samling av variasjoner i terreng og landeformer
          som sammen påvirker et større område. I kartleggingen er den minste
          graden som måles på en kvadratkilometer. Man kan dermed befinne seg i
          et isbrelandskap uten å være akkurat på en isbre. Det vil også kunne
          være noen små variasjoner som ikke bestemmer landskapstypen da de er
          små og derav ikke dominerende.
        </p>
      </Card>

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
    </div>
  );
};

export default Landskap;
