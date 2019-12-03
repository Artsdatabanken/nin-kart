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

const FeatureInfo = ({ lat, lng, sted, landskap, vassdrag }) => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div
      style={{
        backgroundColor: "#eee",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
        position: "absolute",
        zIndex: -1,
        right: 0,
        width: 408,
        top: 36,
        bottom: 0
      }}
    >
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
      </List>
    </div>
  );
};

export default withRouter(FeatureInfo);
