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

      <button
        className={
          settings
            ? "invisible_icon_button legende_button"
            : "invisible_icon_button"
        }
        onClick={() => {
          closeAll();
          setSettings(!settings);
        }}
      >
        Legende <Edit />
      </button>

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
                setSettings(!settings);
                activateLayerFromHistory(navhist);
              }}
            >
              Husk kartlag <Add />
            </button>
          ) : (
            <button
              className="invisible_icon_button remove_icon"
              onClick={() => {
                console.log("gonna delete ", kode);
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
