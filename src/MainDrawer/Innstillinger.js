import Menyelement from "./Menyelement";
import { Layers } from "@material-ui/icons";
import { ListSubheader, Typography } from "@material-ui/core";
import { withStyles, withTheme } from "@material-ui/core/styles";
import { SortByAlpha } from "@material-ui/icons";
import classNames from "classnames";
import React from "react";

const styles = {
  link: { cursor: "pointer" },
  icon: { fontWeight: 600, color: "rgba(0,0,0,0.7)" },
  icondisabled: { textDecoration: "line-through", color: "rgba(0,0,0,0.4)" }
};

const Innstillinger = ({
  classes,
  visKoder,
  sorterPåKode,
  onNavigate,
  onUpdateSetting
}) => (
  <>
    <ListSubheader>Innstillinger</ListSubheader>
    <Menyelement
      onClick={() => onNavigate("/bakgrunnskart?vis")}
      icon={<Layers />}
      primary="Bakgrunnskart"
    />
    <Menyelement
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        onUpdateSetting("visKoder", !visKoder);
      }}
      icon={
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
      }
      primary="Vis koder i tillegg til navn"
      toggle
      checked={visKoder}
    />
    <Menyelement
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        onUpdateSetting("sorterPåKode", !sorterPåKode);
      }}
      icon={<SortByAlpha />}
      primary="Sorter lister etter"
      secondary={sorterPåKode ? "Koder" : "Navn"}
    />
  </>
);

export default withStyles(styles)(withTheme(Innstillinger));
