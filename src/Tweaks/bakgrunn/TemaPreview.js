import React from "react";
import { withRouter } from "react-router";
import typer from "./Tema";

const TemaPreview = ({ type, valgt, onUpdateLayerProp, history }) => (
  <button
    className="theme_button"
    onClick={() => {
      onUpdateLayerProp &&
        onUpdateLayerProp("bakgrunnskart", "kart.aktivtFormat", type);
      history.push(
        history.location.pathname + (onUpdateLayerProp ? "?vis" : "?vis_tema")
      );
    }}
    selected={valgt === type}
  >
    <div>
      {type}
      <img
        src={"/tema/" + type + ".jpg"}
        alt={"Forhåndsvisning av tema " + typer[type]}
      />
    </div>
  </button>
);

export default withRouter(TemaPreview);
