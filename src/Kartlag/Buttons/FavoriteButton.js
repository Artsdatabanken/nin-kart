import React from "react";
import { Tooltip } from "@material-ui/core";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
const FavoriteButton = ({ onToggleLayer, meta, aktiveLag }) => {
  return (
    <button
      onClick={e => {
        onToggleLayer();
        e.stopPropagation();
      }}
    >
      {aktiveLag[meta.kode] ? (
        <Tooltip
          title="Fjern fra mine kartlag"
          aria-label="fjern fra mine kartlag"
        >
          <Favorite />
        </Tooltip>
      ) : (
        <Tooltip
          title="Legg til mine kartlag"
          aria-label="legg til mine kartlag"
        >
          <FavoriteBorder />
        </Tooltip>
      )}
    </button>
  );
};
export default FavoriteButton;
