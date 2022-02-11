import React from "react";
import { Tooltip } from "@material-ui/core";
import { Info } from "@material-ui/icons";
const InfoButton = ({ handleShowInfo, showInfo }) => {
  return (
    <button
      onClick={() => {
        handleShowInfo(!showInfo);
      }}
    >
      <Tooltip title="Åpne informasjon" aria-label="åpne informasjon">
        <Info />
      </Tooltip>
    </button>
  );
};
export default InfoButton;
