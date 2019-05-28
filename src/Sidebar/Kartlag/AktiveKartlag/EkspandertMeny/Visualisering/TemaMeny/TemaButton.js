import React from "react";
import { withRouter } from "react-router";
import typer from "./temaer";
import { KeyboardArrowRight } from "@material-ui/icons";

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

    <div className="theme_link">
      <KeyboardArrowRight />
    </div>
  </button>
);

export default withRouter(TemaButton);
