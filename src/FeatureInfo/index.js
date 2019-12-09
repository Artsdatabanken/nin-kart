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

const FeatureInfo = ({
  lat,
  lng,
  sted,
  arealtype,
  landskap,
  vassdrag,
  laksefjord,
  løsmasse
}) => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div>
      <List>
        <IconButton
          style={{ float: "right", right: 16 }}
          onClick={() => setVisible(!visible)}
        >
          <Close />
        </IconButton>
        <ListSubheader>Overskrift</ListSubheader>
        {lat && (
          <ListItem button>
            <ListItemIcon>
              <LocationSearching />
            </ListItemIcon>
            <ListItemText
              primary={sted && sted.navn}
              secondary={`${Math.round(lat * 10000) / 10000}° N ${Math.round(
                lng * 10000
              ) / 10000}° Ø`}
            />
          </ListItem>
        )}
        <Landskap {...landskap} />
        <Vassdrag {...vassdrag} />
        <Arealtype {...arealtype} />
        <Laksefjord {...laksefjord} />
        <Losmasse {...løsmasse} />
      </List>
    </div>
  );
};

export default withRouter(FeatureInfo);
