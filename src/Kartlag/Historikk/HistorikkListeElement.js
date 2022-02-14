import React from "react";
import språk from "../../Funksjoner/språk";
import { ListItem, ListItemText } from "@material-ui/core";

const HistorikkListeElement = ({ meta, history }) => {
  if (!meta) return;

  return (
    <ListItem button onClick={() => history.push(meta.url)}>
      <ListItemText primary={språk(meta.tittel)}></ListItemText>
    </ListItem>
  );
};

export default HistorikkListeElement;
