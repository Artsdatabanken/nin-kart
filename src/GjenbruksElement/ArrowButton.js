import React from "react";
import { ExpandMore, ExpandLess } from "@material-ui/icons/";

const ArrowButton = ({ expanded, handleExpandClick, title }) => {
  return (
    <button
      className={"layerbutton arrow_button"}
      onClick={handleExpandClick}
      aria-expanded={expanded}
      aria-label="show more"
    >
      {title}
      {expanded ? <ExpandLess /> : <ExpandMore />}
    </button>
  );
};

export default ArrowButton;
