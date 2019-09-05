import Menyelement from "./Menyelement";
import { ListSubheader, Typography } from "@material-ui/core";
import { SortByAlpha } from "@material-ui/icons";
import React from "react";

const Innstillinger = ({ visKoder, sorterPåKode, onUpdateSetting }) => (
  <>
    <ListSubheader>Innstillinger</ListSubheader>

    <Menyelement
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        onUpdateSetting("visKoder", !visKoder);
      }}
      icon={
        <Typography>
          <span>NA</span>
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
      secondary={sorterPåKode ? " koder" : " navn"}
    />
  </>
);

export default Innstillinger;
