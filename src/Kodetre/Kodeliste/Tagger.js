import { ListItem, ListItemText } from "@material-ui/core/";
import React from "react";
import språk from "../../språk";

const Tagger = ({ farge, overordnet, onNavigate, classes }) => {
  if (!overordnet) return null;
  return overordnet.map(item => (
    <ListItem
      key={item.url}
      dense
      button
      onClick={e => {
        e.stopPropagation();
        onNavigate(item.url);
      }}
    >
      <ListItemText primary={språk(item.tittel)} secondary={item.nivå} />
    </ListItem>
  ));
};

export default Tagger;
