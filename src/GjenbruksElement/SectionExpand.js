import React from "react";
import ArrowButton from "./ArrowButton";
import { ListItemText } from "@material-ui/core";
import { ListItemAvatar } from "@material-ui/core";

import config from "../Funksjoner/config";

import Avatar from "@material-ui/core/Avatar";
const SectionExpand = ({ title, children, iconurl }) => {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div className="sectionbox">
      <h5 className="sectionbox-header">
        <span className="avatarlink">
          {iconurl && (
            <Avatar className="avatar">
              {iconurl && (
                <img
                  alt=""
                  src={config.foto(iconurl)}
                  style={{ height: 40, width: 40 }}
                />
              )}
            </Avatar>
          )}
          <span class="avatarlink">
            <ListItemText primary={title} />
          </span>
        </span>

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
