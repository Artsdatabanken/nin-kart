import React from "react";
import { VisibilityOutlined, VisibilityOffOutlined } from "@material-ui/icons";
import LayerButton from "./LayerButton";
const HideLayerButton = ({ onUpdateLayerProp, erSynlig, kode }) => {
  return (
    <LayerButton
      onClick={e => {
        onUpdateLayerProp(kode, "erSynlig", !erSynlig);
        e.stopPropagation();
      }}
      icon={erSynlig ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
      title={"Vis/Skjul"}
    />
  );
};
export default HideLayerButton;
