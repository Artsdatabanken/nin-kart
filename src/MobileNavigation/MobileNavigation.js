import { SettingsContext } from "../SettingsContext";
import React from "react";

const MobileNavigation = () => (
  <SettingsContext.Consumer>
    {context => (
      <div className="tab_selector">
        <button
          className={context.aktivTab === "meny" ? "active_mobile_button" : ""}
          onClick={() => context.onNavigateToTab("meny")}
        >
          Meny
        </button>

        <button
          className={
            context.aktivTab === "informasjon" ? "active_mobile_button" : ""
          }
          onClick={() => context.onNavigateToTab("informasjon")}
        >
          Informasjon
        </button>

        <button
          className={
            context.aktivTab === "kartlag" ? "active_mobile_button" : ""
          }
          onClick={() => context.onNavigateToTab("kartlag")}
        >
          Kart {/* <Layers />*/}
        </button>
      </div>
    )}
  </SettingsContext.Consumer>
);

export default MobileNavigation;
