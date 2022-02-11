import React from "react";
import { Settings } from "@material-ui/icons";
import LayerButton from "./LayerButton";
const SettingsButton = ({
  onSetAktivTab,
  setExpandedSettings,
  expandedSettings
}) => {
  return (
    <LayerButton
      onClick={() => {
        onSetAktivTab("kartlaginnstillinger");
        setExpandedSettings(!expandedSettings);
      }}
      icon={<Settings />}
      title={"Åpne innstillinger"}
    />
  );
};
export default SettingsButton;
