import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
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
  const barn = gradient.barn;
  return (
    <>
      <Typography
        variant="h5"
        style={{ marginBottom: 16, color: "#777", fontWeight: "bold" }}
      >
        Landskap
      </Typography>
      <Typography variant="body1" style={{ marginBottom: 24 }}>
        En landskapstype er en samling av variasjoner i terreng og landeformer
        som sammen påvirker et større område. I kartleggingen er den minste
        graden som måles på en kvadratkilometer. Man kan dermed befinne seg i et
        isbrelandskap uten å være akkurat på en isbre. Det vil også kunne være
        noen små variasjoner som ikke bestemmer landskapstypen da de er små og
        derav ikke dominerende.
      </Typography>

      <Landskapstype
        heading1={tittel.nb}
        heading2="Landskapstype"
        beskrivelse={beskrivelse.nb}
        url={url}
        barn={barn}
      ></Landskapstype>
      <Landskapsgradienter
        heading1="Landskapsgradienter"
        sample={landskap.sample}
      />
    </>
  );
};

export default Landskap;
