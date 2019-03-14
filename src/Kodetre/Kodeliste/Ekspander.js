import React from "react";
import { withStyles, Typography } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Link from "@material-ui/icons/Link";
import OpenData from "./OpenData";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "90%",
    _paddingLeft: 24,
    flexShrink: 1
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap"
  },
  panelDetails: {
    display: "block",
    padding: 0
  }
});

const Ekspander = ({
  expanded,
  visible = true,
  onExpand,
  classes,
  children,
  heading,
  heading2,
  icon
}) => {
  if (!visible) return null;
  if (heading === "Datakilde") icon = <OpenData />;
  return (
    <ExpansionPanel expanded={expanded} onChange={onExpand}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div
          style={{
            position: "relative",
            top: -2,
            paddingRight: 4,
            color: "rgba(0,0,0,0.4)"
          }}
        >
          {icon || <Link />}
        </div>
        <Typography className={classes.heading}>{heading}</Typography>
        <Typography className={classes.secondaryHeading}>{heading2}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.panelDetails}>
        {children}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default withStyles(styles)(Ekspander);
