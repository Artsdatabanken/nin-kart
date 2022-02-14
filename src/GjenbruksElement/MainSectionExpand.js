import React from "react";
import ArrowButton from "./ArrowButton";

const SectionExpand = ({ icon, title, children }) => {
  const [expanded, setExpanded] = React.useState(true);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div className="section">
      <h3 className="kartlag_header">
        {icon}
        {title}
        <ArrowButton
          handleExpandClick={handleExpandClick}
          expanded={expanded}
        />
      </h3>
      {expanded && children}
    </div>
  );
};

export default SectionExpand;
