import React from "react";
import { withRouter } from "react-router";
import typer from "./temaer";

const TemaButton = ({ type, aktivtFormat, onUpdateLayerProp }) => (
  <button
    className={
      aktivtFormat.aktivtFormat === type
        ? "selected_button button_map_preview"
        : "button_map_preview"
    }
    onClick={() => {
      onUpdateLayerProp &&
        onUpdateLayerProp("bakgrunnskart", "kart.aktivtFormat", type);
    }}
  >
    <img
      src={"/tema/" + type + ".jpg"}
      alt={"Forhåndsvisning av tema " + typer[type]}
    />
    <span>
      {typer[type]}
      <br /> {type}
    </span>
  </button>
);

export default withRouter(TemaButton);
