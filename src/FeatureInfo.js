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

const FeatureInfo = ({ query, onQueryChange, hits, setHits }) => {
  return (
    <div
      style={{
        backgroundColor: "#eee",
        position: "absolute",
        right: 0,
        width: 408,
        top: 114,
        bottom: 0
      }}
    >
      <List>
        <ListSubheader>Overskrift</ListSubheader>
        <ListItem button>
          <ListItemAvatar>
            <Close />
          </ListItemAvatar>
          <ListItemText primary="prim" secondary="sec" />
        </ListItem>
      </List>
    </div>
  );
};

export default withRouter(FeatureInfo);
