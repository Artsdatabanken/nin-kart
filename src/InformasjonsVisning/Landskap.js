import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Overskrift from "./Overskrift";
import Landskapstype from "./Landskapstype";
import Landskapsgradienter from "./Landskapsgradienter";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 445,
    margin: 8,
  },
  cardheader: {
    cursor: "pointer",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {},
  related: {
    cursor: "pointer",
  },
  relatedIcon: {
    transform: "rotate(-140deg)",
    color: "#9e9e9e",
    float: "right",
    position: "relative",
    top: -2,
  },
}));

const Landskap = ({ landskap }) => {
  const classes = useStyles();
  if (!landskap) return null;
  const { tittel, beskrivelse, url } = landskap;
  const gradient = landskap.gradient && landskap.gradient["NN-LA-KLG"];
  const barn = gradient && gradient.barn;
  return (
    <>
      <Overskrift
        heading="Landskap"
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
