import LocationSearching from "@material-ui/icons/LocationSearching";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import {
  List,
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
  meta,
  onUpdateLayerProp,
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
        <Landskap {...landskap} onUpdateLayerProp={onUpdateLayerProp} />
        <Naturtype
          {...naturtype}
          onUpdateLayerProp={onUpdateLayerProp}
          barn={meta.barn}
        />
        <Livsmiljø {...livsmiljø} onUpdateLayerProp={onUpdateLayerProp} />
        <Vassdrag {...vassdrag} onUpdateLayerProp={onUpdateLayerProp} />
        <Arealtype {...arealtype} onUpdateLayerProp={onUpdateLayerProp} />
        <Laksefjord {...laksefjord} onUpdateLayerProp={onUpdateLayerProp} />
        <Losmasse {...løsmasse} onUpdateLayerProp={onUpdateLayerProp} />
        <Bioklimatisk
          {...seksjon}
          onUpdateLayerProp={onUpdateLayerProp}
          tittel="Bioklimatisk seksjon"
        />
        <Bioklimatisk
          {...sone}
          onUpdateLayerProp={onUpdateLayerProp}
          tittel="Bioklimatisk sone"
        />
      </List>
    </div>
  );
};

export default withRouter(FeatureInfo);
