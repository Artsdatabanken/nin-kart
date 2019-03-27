import { ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router";
import typer from "./Tema";

const TemaPreview = ({ type, valgt, onUpdateLayerProp, history }) => (
  <ListItem
    button
    onClick={() => {
      onUpdateLayerProp &&
        onUpdateLayerProp("bakgrunnskart", "kart.aktivtFormat", type);
      history.push(
        history.location.pathname + (onUpdateLayerProp ? "?vis" : "?vis_tema")
      );
    }}
    selected={valgt === type}
  >
    <ListItemText
      secondary={typer[type]}
      primary={
        <img
          src={"/tema/" + type + ".jpg"}
          alt={"Forhåndsvisning av tema " + typer[type]}
        />
      }
    />
  </ListItem>
);

export default withRouter(TemaPreview);
