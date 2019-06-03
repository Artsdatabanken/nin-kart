import Typography from "@material-ui/core/Typography";
import React from "react";
import InfoIconButton from "./InfoIconButton";

const Tekstboks = ({ tittel, beskrivelse, infoUrl }) => (
  <>
    <Typography>{tittel}</Typography>
    <Typography>
      <InfoIconButton href={infoUrl} />
      {beskrivelse}
    </Typography>
  </>
);

export default Tekstboks;
