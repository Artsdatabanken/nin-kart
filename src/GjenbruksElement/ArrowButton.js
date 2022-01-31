import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ExpandMore, ExpandLess } from "@material-ui/icons/";
const useStyles = makeStyles(theme => ({
  expand: {
    marginLeft: "auto"
  }
}));

const ArrowButton = ({ expanded, handleExpandClick, title }) => {
  const classes = useStyles();

  return (
    <button
      className={classes.expand}
      onClick={handleExpandClick}
      aria-expanded={expanded}
      aria-label="show more"
    >
      {title}
      {expanded ? <ExpandMore /> : <ExpandLess />}
    </button>
  );
};

export default ArrowButton;
