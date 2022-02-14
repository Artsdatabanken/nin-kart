import React from "react";
import { Info } from "@material-ui/icons";
import LayerButton from "./LayerButton";
const InfoButton = ({ handleShowInfo, showInfo }) => {
  return (
    <LayerButton
      onClick={() => {
        handleShowInfo(!showInfo);
      }}
      icon={<Info />}
      title={"Åpne informasjon"}
    />
  );
};
export default InfoButton;
