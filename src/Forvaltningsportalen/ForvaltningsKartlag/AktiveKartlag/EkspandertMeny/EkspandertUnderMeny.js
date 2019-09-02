import React from "react";
import { Close, OpenInNew, ColorLens, Add } from "@material-ui/icons";

const EkspandertUnderMeny = ({
  closeAll,
  kode,
  onRemoveSelectedLayer,
  theme,
  setTheme,
  onFitBounds,
  navhist,
  bbox,
  activateLayerFromHistory,
  is_current_object
}) => {
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

      {kode !== "bakgrunnskart" && (
        <>
          <button
            className="invisible_icon_button"
            onClick={event => {
              //context.onNavigateToTab("kart");
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
                activateLayerFromHistory(navhist);
              }}
            >
              Husk kartlag <Add />
            </button>
          ) : (
            <button
              className="invisible_icon_button remove_icon"
              onClick={() => {
                // console.log("gonna delete ", kode);
                onRemoveSelectedLayer(kode);
              }}
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
