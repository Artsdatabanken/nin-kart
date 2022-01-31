import React from "react";
import ArrowButton from "./ArrowButton";
import { ListItemText } from "@material-ui/core";
const SectionExpand = ({ title, children }) => {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div className="sectionbox">
      <h5 className="sectionbox-header ">
        <ListItemText primary={title} />
        <ArrowButton
          handleExpandClick={handleExpandClick}
          expanded={expanded}
        />
      </h5>
      {expanded && <>{children}</>}
    </div>
  );
};

export default SectionExpand;
