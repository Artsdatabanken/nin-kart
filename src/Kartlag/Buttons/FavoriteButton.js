import React from "react";
import LayerButton from "./LayerButton";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
const FavoriteButton = ({ onToggleLayer, meta, aktiveLag }) => {
  return (
    <LayerButton
      onClick={e => {
        onToggleLayer();
        e.stopPropagation();
      }}
      icon={aktiveLag[meta.kode] ? <Favorite /> : <FavoriteBorder />}
      title={
        aktiveLag[meta.kode]
          ? "Fjern fra mine kartlag"
          : "Legg til mine kartlag"
      }
    />
  );
};
export default FavoriteButton;
