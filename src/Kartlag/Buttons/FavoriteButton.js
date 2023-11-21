import React from "react";
import LayerButton from "./LayerButton";
import { Favorite, FavoriteBorder, Close } from "@material-ui/icons";
const FavoriteButton = ({ onToggleLayer, turnedOn, removeFave }) => {
  let icon = turnedOn ? <Favorite /> : <FavoriteBorder />;
  icon = removeFave ? <Close /> : icon;
  return (
    <LayerButton
      onClick={e => {
        onToggleLayer();
        e.stopPropagation();
      }}
      icon={icon}
      title={turnedOn ? "Fjern fra mine kartlag" : "Legg til mine kartlag"}
      active={turnedOn}
      removefave={removeFave}
    />
  );
};
export default FavoriteButton;
