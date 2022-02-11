import React from "react";
import { Tooltip } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
const BackButton = ({ onNavigate, backurl }) => {
  return (
    <button
      onClick={() => {
        onNavigate(backurl);
      }}
    >
      <Tooltip title="Åpne informasjon" aria-label="åpne informasjon">
        <ArrowBack />
      </Tooltip>
    </button>
  );
};
export default BackButton;
