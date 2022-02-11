import React from "react";
import { Tooltip } from "@material-ui/core";
import { Settings } from "@material-ui/icons";
const SettingsButton = ({
  onSetAktivTab,
  setExpandedSettings,
  expandedSettings
}) => {
  return (
    <button
      onClick={() => {
        onSetAktivTab("kartlaginnstillinger");
        setExpandedSettings(!expandedSettings);
      }}
    >
      <Tooltip title="Åpne innstillinger" aria-label="åpne innstillinger">
        <Settings />
      </Tooltip>
    </button>
  );
};
export default SettingsButton;
