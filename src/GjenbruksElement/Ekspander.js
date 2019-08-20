import React, { useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Link from "@material-ui/icons/Link";
import OpenData from "GjenbruksElement/OpenData";

const Ekspander = ({
  visible,
  children,
  heading,
  heading2,
  icon,
  is_expanded
}) => {
  if (heading === "Datakilde") icon = <OpenData />;
  const [expanded, setExpanded] = useState(is_expanded || false);
  if (!visible) return null;

  return (
    <div className="sidebar_element ">
      <button
        className="clickable_element"
        onClick={e => {
          e.stopPropagation();
          setExpanded(!expanded);
        }}
      >
        <h3>
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
      </button>
      {expanded === true && <div className="expander_content">{children}</div>}
    </div>
  );
};

export default Ekspander;
