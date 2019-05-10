import React from "react";
import { withRouter } from "react-router";
import typer from "./TemaMeny";
import { KeyboardArrowRight } from "@material-ui/icons";

const TemaButton = ({ type, valgt, onUpdateLayerProp, history }) => (
  <button
    className="button_map_preview"
    onClick={() => {
      onUpdateLayerProp &&
        onUpdateLayerProp("bakgrunnskart", "kart.aktivtFormat", type);
      history.push(
        history.location.pathname + (onUpdateLayerProp ? "?vis" : "?vis_tema")
      );
    }}
    selected={valgt === type}
  >
    <div className="button_map_preview_first_part">
      Bakgrunn: {typer[type]} {type}
      <img
        src={"/tema/" + type + ".jpg"}
        alt={"Forhåndsvisning av tema " + typer[type]}
      />
    </div>

    <div className="theme_link">
      <KeyboardArrowRight />
    </div>
  </button>
);

export default withRouter(TemaButton);
