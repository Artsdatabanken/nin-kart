import React from "react";
import {
  ExpansionPanelDetails,
  ExpansionPanel,
  Avatar,
  withStyles,
  Typography
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Link from "@material-ui/icons/Link";
import OpenData from "./OpenData";
import EkspanderSummary from "./EkspanderSummary";

const styles = theme => ({
  root: {
    width: "100%"
  },
  icon: {
    position: "absolute",
    left: 16,
    top: "50%",
    transform: "translateY(-50%) rotate(0deg)",
    paddingRight: 6,
    color: "rgba(0,0,0,0.5)"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "90%",
    flexShrink: 1,
    lineHeight: "2.6em",
    paddingLeft: 24,
    color: "rgba(0,0,0,0.5)"
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    lineHeight: "2.6em",
    fontWeight: 500,
    whiteSpace: "nowrap",
    color: "rgba(0,0,0,0.3)"
  },
  panelDetails: {
    display: "block",
    _padding: 0
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
    <ExpansionPanel
      expanded={expanded}
      onChange={onExpand}
      className={classes.panel}
    >
      <EkspanderSummary
        expandIcon={<ExpandMoreIcon />}
        className={classes.panelSummary}
      >
        <div className={classes.icon}>{icon || <Link />}</div>
        <Typography className={classes.heading}>{heading}</Typography>
        {false && (
          <Typography className={classes.secondaryHeading}>
            {heading2}
          </Typography>
        )}
        <div>
          {heading2 && (
            <Avatar
              style={{
                marginTop: 8,
                width: 22,
                height: 22,
                fontSize: 13,
                lineHeight: "2.6em",
                float: "right"
              }}
            >
              {heading2}
            </Avatar>
          )}
        </div>
      </EkspanderSummary>
      <ExpansionPanelDetails className={classes.panelDetails}>
        {children}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default withStyles(styles)(Ekspander);
