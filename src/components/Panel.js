import React from "react";
import { SettingsContext } from "../SettingsContext";

const Panel = ({ children, onClickMenu, onClickMap }) => (
  <SettingsContext.Consumer>
    {context => (
      <div className="sidebar">
        {context.aktivTab === "meny" && children}
        <div className="mobile_navigation">
          <button onClick={() => context.onClickTab("meny")}>Meny</button>
          <button onClick={() => context.onClickTab("kart")}>Kart</button>
        </div>
      </div>
    )}
  </SettingsContext.Consumer>
);

export default Panel;
