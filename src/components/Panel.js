import React from "react";
import { withStyles } from "@material-ui/core";
import classNames from "classnames";

const styles = {
  rot: {
    height: "100vh",
    overflowX: "hidden",
    overflowY: "overlay"
  }
};

const Panel = ({ classes, style, children }) => (
  <div className={classNames(classes.rot)}>{children}</div>
);

export default withStyles(styles)(Panel);
