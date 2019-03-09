import {
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar
} from "@material-ui/core/";
import React from "react";
import språk from "../../språk";

const Overordnet = ({ farge, overordnet, onNavigate, classes }) => {
  const r = overordnet.map((item, i) => (
    <ListItem
      key={item.url}
      dense
      button
      onClick={e => {
        e.stopPropagation();
        onNavigate(item.url);
      }}
    >
      <ListItemAvatar>
        <Avatar>{overordnet.length - i - 1}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={språk(item.tittel)} secondary={item.nivå} />
    </ListItem>
  ));
  r.reverse();
  return r;
};

export default Overordnet;
