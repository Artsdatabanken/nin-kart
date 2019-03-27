import { List } from "@material-ui/core";
import React from "react";
import TemaPreview from "./TemaPreview";
import typer from "./temaer";

const Tema = ({ valgt, onUpdateLayerProp }) => (
  <List>
    {Object.keys(typer).map(key => {
      return (
        <TemaPreview
          button
          type={key}
          valgt={valgt}
          onUpdateLayerProp={onUpdateLayerProp}
        />
      );
    })}
  </List>
);

export default Tema;
