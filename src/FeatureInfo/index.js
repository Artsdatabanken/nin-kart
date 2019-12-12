import LocationSearching from "@material-ui/icons/LocationSearching";
import Close from "@material-ui/icons/Close";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import {
  List,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from "@material-ui/core";
import Landskap from "./Landskap";
import Vassdrag from "./Vassdrag";
import Arealtype from "./Arealtype";
import Laksefjord from "./Laksefjord";
import Losmasse from "./Løsmasse";
import Naturtype from "./Naturtype";
import Livsmiljø from "./Livsmiljø";
import Bioklimatisk from "./Bioklimatisk";

const FeatureInfo = ({
  lat,
  lng,
  sted,
  kommune,
  arealtype,
  landskap,
  naturtype,
  livsmiljø,
  vassdrag,
  seksjon,
  sone,
  laksefjord,
  løsmasse
}) => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  const coords = `${Math.round(lat * 10000) / 10000}° N ${Math.round(
    lng * 10000
  ) / 10000}° Ø`;
  console.log("kommune", kommune);
  const kommunestr =
    kommune &&
    kommune.kommune.tittel.nb + " kommune i " + kommune.fylke.tittel.nb;
  return (
    <div>
      <List>
        <ListSubheader>{lat ? coords : "Klikk i kartet..."}</ListSubheader>
        {lat && (
          <ListItem button>
            <ListItemIcon>
              <LocationSearching />
            </ListItemIcon>
            <ListItemText primary={sted && sted.navn} secondary={kommunestr} />
          </ListItem>
        )}
        <Landskap {...landskap} />
        <Naturtype {...naturtype} />
        <Livsmiljø {...livsmiljø} />
        <Vassdrag {...vassdrag} />
        <Arealtype {...arealtype} />
        <Laksefjord {...laksefjord} />
        <Losmasse {...løsmasse} />
        <Bioklimatisk {...seksjon} tittel="Bioklimatisk seksjon" />
        <Bioklimatisk {...sone} tittel="Bioklimatisk sone" />
      </List>
    </div>
  );
};

export default withRouter(FeatureInfo);
