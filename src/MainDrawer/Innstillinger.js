import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
  Switch
} from "@material-ui/core";
import { withStyles, withTheme } from "@material-ui/core/styles";
import { SortByAlpha } from "@material-ui/icons";
import classNames from "classnames";
import { PropTypes } from "prop-types";
import React, { Component } from "react";

const styles = {
  link: { cursor: "pointer" },
  icon: { fontWeight: 600, color: "rgba(0,0,0,0.7)" },
  icondisabled: { textDecoration: "line-through", color: "rgba(0,0,0,0.4)" }
};

class Innstillinger extends Component {
  render() {
    const { classes, visKoder, sorterPåKode, onUpdateSetting } = this.props;
    return (
      <>
        <ListSubheader>Innstillinger</ListSubheader>
        <ListItem
          button
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            onUpdateSetting("visKoder", !visKoder);
          }}
        >
          <ListItemIcon>
            <Typography>
              <span
                className={classNames(
                  classes.icon,
                  !visKoder && classes.icondisabled
                )}
              >
                NA
              </span>
            </Typography>
          </ListItemIcon>
          <ListItemText primary="Vis koder i tillegg til navn" />
          <Switch checked={visKoder} />
        </ListItem>
        <ListItem
          button
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            onUpdateSetting("sorterPåKode", !sorterPåKode);
          }}
        >
          <ListItemIcon>
            <SortByAlpha />
          </ListItemIcon>
          <ListItemText
            primary="Sorter lister etter"
            secondary={sorterPåKode ? "Koder" : "Navn"}
          />
        </ListItem>
        <Divider />
      </>
    );
  }
}

Innstillinger.propTypes = {
  visKoder: PropTypes.bool,
  sorterPåKode: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  onUpdateSetting: PropTypes.func.isRequired
};

export default withStyles(styles)(withTheme()(Innstillinger));
