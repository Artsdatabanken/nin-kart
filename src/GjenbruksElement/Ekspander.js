import React, { useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Link from "@material-ui/icons/Link";
import OpenData from "Kodetre/Kodeliste/OpenData";

const Ekspander = ({ visible, children, heading, heading2, icon }) => {
  if (heading === "Datakilde") icon = <OpenData />;
  const [expanded, setExpanded] = useState(false);
  if (!visible) return null;

  return (
    <div className="sidebar_element clickable_element">
      <h3
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        {icon || <Link />}
        {heading}
        {heading2 && (
          <span className="sidebar_title_number">
            {heading2}
            {expanded === true ? (
              <ExpandMoreIcon className="expand_icon rotated" />
            ) : (
              <ExpandMoreIcon className="expand_icon" />
            )}
          </span>
        )}
      </h3>

      {expanded === true && <div className="expander_content">{children}</div>}
    </div>
  );
};

export default Ekspander;
