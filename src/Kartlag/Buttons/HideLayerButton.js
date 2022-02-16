import React from "react";
import { VisibilityOutlined, VisibilityOffOutlined } from "@material-ui/icons";
import LayerButton from "./LayerButton";
const HideLayerButton = ({
  onUpdateLayerProp,
  erSynlig,
  kode,
  isSubElement
}) => {
  const subelement = isSubElement ? "barn" : "";
  return (
    <LayerButton
      onClick={e => {
        onUpdateLayerProp(kode, "erSynlig", !erSynlig, subelement);
        e.stopPropagation();
      }}
      icon={erSynlig ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
      title={"Vis/Skjul"}
    />
  );
};
export default HideLayerButton;
