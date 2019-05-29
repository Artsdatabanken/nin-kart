import { ArrowForward, Layers } from "@material-ui/icons/";
import React from "react";
import { SettingsContext } from "SettingsContext";

const AktiverKartlagKnapp = ({ erAktivert, onToggleLayer, meta }) => {
  /*
   
  */
  if (!meta.overordnet || meta.overordnet.length <= 0) return null;
  if (!meta.bbox) return null;
  return (
    <>
      <SettingsContext.Consumer>
        {context => (
          <div className="sidebar_element activate_button_container">
            <button
              className="activate_button"
              onClick={event => {
                if (!erAktivert) {
                  onToggleLayer();
                }
                context.onNavigateToTab("kartlag");
              }}
            >
              Legg til kartlag <ArrowForward />
              <Layers />
            </button>
          </div>
        )}
      </SettingsContext.Consumer>
    </>
  );
};
export default AktiverKartlagKnapp;
