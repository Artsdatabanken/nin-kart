import Search from "@material-ui/icons/Search";
import Close from "@material-ui/icons/Close";
import React from "react";
import { withRouter } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader
} from "@material-ui/core";

const FeatureInfo = ({ lat, lng, sted, wms1 }) => {
  return (
    <div
      style={{
        backgroundColor: "#eee",
        position: "absolute",
        right: 0,
        width: 408,
        top: 38,
        bottom: 0
      }}
    >
      <List>
        <ListSubheader>Overskrift</ListSubheader>
        {lat && (
          <ListItem button>
            <ListItemAvatar>
              <Close />
            </ListItemAvatar>
            <ListItemText
              primary={sted && sted.navn}
              secondary={`${Math.round(lat * 10000) / 10000}° N ${Math.round(
                lng * 10000
              ) / 10000}° Ø`}
            />
          </ListItem>
        )}
        <ListItem button>
          <ListItemAvatar>
            <Close />
          </ListItemAvatar>
          <ListItemText primary="prim" secondary="sec" />
        </ListItem>
      </List>
      <div>{JSON.stringify(sted)}</div>
    </div>
  );
};

export default withRouter(FeatureInfo);
