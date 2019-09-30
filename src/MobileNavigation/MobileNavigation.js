import React from "react";

const MobileNavigation = ({
  onNavigateToTab,
  aktivTab,
  hidden_in_fullscreen
}) => (
  <div
    className={
      hidden_in_fullscreen && aktivTab === "kartlag"
        ? "hidden_in_fullscreen"
        : "tab_selector"
    }
    role="tablist"
    aria-orientation="horizontal"
  >
    <button
      role="tab"
      aria-selected={aktivTab === "meny"}
      className={aktivTab === "meny" ? "active_mobile_button" : ""}
      onClick={() => {
        onNavigateToTab("meny");
      }}
    >
      Navigering
    </button>

    <button
      role="tab"
      aria-selected={aktivTab === "informasjon"}
      className={
        aktivTab === "informasjon"
          ? "active_mobile_button"
          : aktivTab === "meny"
          ? "active_mobile_button_bigscreen"
          : ""
      }
      onClick={() => onNavigateToTab("informasjon")}
    >
      Informasjon
    </button>

    <button
      role="tab"
      aria-selected={aktivTab === "kartlag"}
      className={aktivTab === "kartlag" ? "active_mobile_button" : ""}
      onClick={() => onNavigateToTab("kartlag")}
    >
      Kart
    </button>
  </div>
);

export default MobileNavigation;
