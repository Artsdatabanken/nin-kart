import React from "react";
import { Close, OpenInNew, Add } from "@material-ui/icons";

const EkspandertUnderMeny = ({
  kode,
  onRemoveSelectedLayer,
  onFitBounds,
  navhist,
  bbox,
  activateLayerFromHistory,
  is_current_object,
  erLokalitet
}) => {
  return (
    <div className="kartlag_submeny">
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
                activateLayerFromHistory(navhist);
              }}
            >
              Husk kartlag <Add />
            </button>
          ) : (
            <>
              {!erLokalitet && (
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
        </>
      )}
    </div>
  );
};

export default EkspandertUnderMeny;
