import React from "react";
import { Tooltip } from "@material-ui/core";
const LayerButton = ({ onClick, icon, title }) => {
  return (
    <button
      className="layerbutton"
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
