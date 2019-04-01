import { SettingsContext } from "../SettingsContext";
import React from "react";

const MobileNavigation = () => (
  <SettingsContext.Consumer>
    {context => (
      <div className="mobile_navigation">
        <button
          className={context.aktivTab == "meny" && "_active"}
          onClick={() => context.onClickTab("meny")}
        >
          Meny
        </button>
        <button onClick={() => context.onClickTab("kart")}>Kart</button>
      </div>
    )}
  </SettingsContext.Consumer>
);

export default MobileNavigation;
