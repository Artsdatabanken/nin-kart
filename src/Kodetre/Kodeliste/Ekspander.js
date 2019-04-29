import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Link from "@material-ui/icons/Link";
import OpenData from "./OpenData";

const Ekspander = ({
  expanded,
  visible = true,
  onExpand,
  children,
  heading,
  heading2,
  icon
}) => {
  if (!visible) return null;
  if (heading === "Datakilde") icon = <OpenData />;
  return (
    <div
      //expanded={expanded}
      onClick={onExpand}
      className="sidebar_element clickable_element"
    >
      <h3>
        {icon || <Link />}
        {heading}
        {heading2 && (
          <span className="sidebar_title_number">
            {heading2}
            {expanded === true && (
              <ExpandMoreIcon className="expand_icon rotated" />
            )}
            {expanded !== true && <ExpandMoreIcon className="expand_icon" />}
          </span>
        )}
      </h3>

      {expanded === true && <div className="expander_content">{children}</div>}
    </div>
  );
};

export default Ekspander;
