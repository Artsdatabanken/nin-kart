import React from "react";
import { Tooltip } from "@material-ui/core";
const LayerButton = ({ onClick, icon, title, active, removefave }) => {
  const addActive = active && !removefave;
  return (
    <button
      className={"layerbutton " + (addActive && "active")}
      onClick={e => {
        onClick(e);
      }}
    >
      <Tooltip title={title} aria-label={title}>
        {icon}
      </Tooltip>
    </button>
  );
};
export default LayerButton;
