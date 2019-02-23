import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import React from "react";

const Illustrasjon = ({ bilde, beskrivelse }) => (
  <React.Fragment>
    <CardMedia src={bilde} alt="illustrasjon" />
    <Typography>{beskrivelse}</Typography>
  </React.Fragment>
);

export default Illustrasjon;
