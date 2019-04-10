import { SettingsContext } from "../SettingsContext";
import React from "react";

const MobileNavigation = () => (
  <SettingsContext.Consumer>
    {context => (
      <div className="mobile_navigation">
        <button
          className={context.aktivTab === "meny" ? "active_mobile_button" : ""}
          onClick={() => context.onNavigateToTab("meny")}
        >
          Meny
        </button>
        <button
          className={context.aktivTab === "kart" ? "active_mobile_button" : ""}
          onClick={() => context.onNavigateToTab("kart")}
        >
          Kart
        </button>
      </div>
    )}
  </SettingsContext.Consumer>
);

export default MobileNavigation;
