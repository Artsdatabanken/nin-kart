import { ArrowForward, Layers } from "@material-ui/icons/";
import React from "react";
import { withRouter } from "react-router";

const Knapperad = ({ erAktivert, onToggleLayer, bbox }) => (
  <>
    {bbox && (
      <div className="sidebar_element activate_button_container">
        <button
          className="activate_button"
          onClick={onToggleLayer}
          disabled={erAktivert}
        >
          Legg til kartlag <ArrowForward />
          <Layers />
        </button>

        {/* 
         <LibraryAdd/>
        <Button
          className={classes.button}
          onClick={() => history.push(history.location.pathname + "?vis")}
        >
          <ColorLens className={classes.iconSmall} />
          Vis
        </Button>
          */}
      </div>
    )}
  </>
);

export default withRouter(Knapperad);
