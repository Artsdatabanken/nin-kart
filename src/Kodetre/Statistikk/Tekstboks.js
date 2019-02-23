import Typography from "@material-ui/core/Typography";
import React from "react";
import InfoIconButton from "./InfoIconButton";

const Tekstboks = ({ tittel, beskrivelse, infoUrl }) => (
  <React.Fragment>
    <Typography>{tittel}</Typography>
    <Typography>
      <InfoIconButton href={infoUrl} />
      {beskrivelse}
    </Typography>
  </React.Fragment>
);

export default Tekstboks;
