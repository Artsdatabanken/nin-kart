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
