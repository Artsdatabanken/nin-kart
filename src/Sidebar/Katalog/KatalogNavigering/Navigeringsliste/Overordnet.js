import {
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar
} from "@material-ui/core/";
import React from "react";
import språk from "Funksjoner/språk";

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
      {true && (
        <ListItemAvatar>
          <Avatar style={{ width: 20, height: 20, margin: 0, fontSize: 10 }}>
            {overordnet.length - i - 1}
          </Avatar>
        </ListItemAvatar>
      )}

      <ListItemText primary={språk(item.tittel)} _secondary={item.nivå} />
    </ListItem>
  ));
  r.reverse();
  return r;
};

export default Overordnet;
