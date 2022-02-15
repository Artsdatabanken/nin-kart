import React from "react";
import { VisibilityOutlined, VisibilityOffOutlined } from "@material-ui/icons";
import LayerButton from "./LayerButton";
const HideLayerButton = ({ onUpdateLayerProp, erSynlig, kode }) => {
  return (
    <LayerButton
      onClick={e => {
        console.log(kode, "erSynlig", !erSynlig);
        onUpdateLayerProp(kode, "erSynlig", !erSynlig, "barn");
        e.stopPropagation();
      }}
      icon={erSynlig ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
      title={"Vis/Skjul"}
    />
  );
};
export default HideLayerButton;
