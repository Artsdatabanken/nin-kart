import { SettingsContext } from "../SettingsContext";
import React from "react";

const MobileNavigation = () => (
  <SettingsContext.Consumer>
    {context => (
      <div
        className="tab_selector"
        role="tablist"
        aria-orientation="horizontal"
      >
        <button
          className={context.aktivTab === "meny" ? "active_mobile_button" : ""}
          onClick={() => context.onNavigateToTab("meny")}
        >
          Navigering
        </button>

        <button
          role="tab"
          aria-selected={context.aktivTab === "informasjon"}
          className={
            context.aktivTab === "informasjon"
              ? "active_mobile_button"
              : context.aktivTab === "meny"
              ? "active_mobile_button_bigscreen"
              : ""
          }
          onClick={() => {
            context.onNavigateToTab("informasjon");
          }}
        >
          Informasjon
        </button>

        <button
          role="tab"
          aria-selected={context.aktivTab === "kartlag"}
          className={
            context.aktivTab === "kartlag" ? "active_mobile_button" : ""
          }
          onClick={() => {
            context.onNavigateToTab("kartlag");
          }}
        >
          Kart {/* <Layers />*/}
        </button>
      </div>
    )}
  </SettingsContext.Consumer>
);

export default MobileNavigation;
