import React from "react";
import LayerButton from "./LayerButton";
import { ArrowBack } from "@material-ui/icons";
const BackButton = ({ onNavigate, backurl }) => {
  return (
    <LayerButton
      onClick={() => {
        onNavigate(backurl);
      }}
      icon={<ArrowBack />}
      title={"Tilbake"}
    />
  );
};
export default BackButton;
