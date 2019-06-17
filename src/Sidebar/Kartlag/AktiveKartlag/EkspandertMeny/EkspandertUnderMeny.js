import React from "react";
import { Close, OpenInNew, ColorLens, Edit, Add } from "@material-ui/icons";

const EkspandertUnderMeny = ({
  closeAll,
  kode,
  settings,
  setSettings,
  onRemoveSelectedLayer,
  theme,
  setTheme,
  onFitBounds,
  navhist,
  context,
  bbox,
  activateLayerFromHistory,
  is_current_object
}) => {
  if (is_current_object) {
    closeAll();
    setSettings(true);
  }
  return (
    <div className="kartlag_submeny">
      {kode === "bakgrunnskart" && (
        <button
          className="invisible_icon_button"
          onClick={() => {
            closeAll();
            setTheme(!theme);
          }}
        >
          Tema <ColorLens />
        </button>
      )}
      {!is_current_object && (
        <button
          className="invisible_icon_button"
          onClick={() => {
            closeAll();
            setSettings(!settings);
          }}
        >
          Rediger <Edit />
        </button>
      )}

      {kode !== "bakgrunnskart" && (
        <>
          <button
            className="invisible_icon_button"
            onClick={event => {
              context.onNavigateToTab("kart");
              onFitBounds(bbox);
            }}
          >
            Zoom til <OpenInNew />
          </button>
          {is_current_object ? (
            <button
              className="invisible_icon_button"
              onClick={() => {
                closeAll();
                setSettings(!settings);
                activateLayerFromHistory(navhist);
              }}
            >
              Legg Til <Add />
            </button>
          ) : (
            <button
              className="invisible_icon_button remove_icon"
              onClick={() => onRemoveSelectedLayer(kode)}
            >
              Fjern <Close />
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default EkspandertUnderMeny;
