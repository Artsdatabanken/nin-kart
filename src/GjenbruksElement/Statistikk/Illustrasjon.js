import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import React from "react";

const Illustrasjon = ({ bilde, beskrivelse }) => (
  <>
    <CardMedia src={bilde} alt="illustrasjon" />
    <Typography>{beskrivelse}</Typography>
  </>
);

export default Illustrasjon;
