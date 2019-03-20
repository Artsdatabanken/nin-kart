import Typography from "@material-ui/core/Typography";
import React from "react";
import InfoIconButton from "./InfoIconButton";

const Ingress = ({ infoUrl, beskrivelse }) => (
  <>
    {infoUrl && <InfoIconButton href={infoUrl} />}
    <Typography>{beskrivelse}</Typography>
  </>
);

export default Ingress;
