import { ArrowForward, Layers } from "@material-ui/icons/";
import React from "react";
import { withRouter } from "react-router";

import { SettingsContext } from "../../SettingsContext";
const Knapperad = ({ erAktivert, onToggleLayer, bbox }) => (
  <>
    {bbox && (
      <SettingsContext.Consumer>
        {context => (
          <div className="sidebar_element activate_button_container">
            <button
              className="activate_button"
              onClick={event => {
                onToggleLayer();
                context.onNavigateToTab("kartlag");
              }}
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
      </SettingsContext.Consumer>
    )}
  </>
);

export default withRouter(Knapperad);
