import React from "react";

const MobileNavigation = ({ onNavigateToTab, aktivTab }) => (
  <div className="tab_selector">
    <button
      className={aktivTab === "meny" ? "active_mobile_button" : ""}
      onClick={() => {
        onNavigateToTab("meny");
      }}
    >
      Navigering
    </button>

    <button
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
      className={aktivTab === "kartlag" ? "active_mobile_button" : ""}
      onClick={() => onNavigateToTab("kartlag")}
    >
      Kart
    </button>
  </div>
);

export default MobileNavigation;
