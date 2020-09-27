import React from "react";
import { SettingsContext } from "SettingsContext";
//import EkspandertUnderMeny from "./EkspandertMeny/EkspandertUnderMeny";
//import EkspandertInnhold from "./EkspandertMeny/EkspandertInnhold";
//import EkspanderingsTopplinje from "./EkspanderingsTopplinje";
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { VisibilityOutlined, VisibilityOffOutlined } from "@material-ui/icons";

const AktivtKartlagElement = ({
  kartlag,
  onUpdateLayerProp,
  is_current_object,
}) => {
  if (!kartlag) {
    return null;
  }
  const kode = kartlag.kode;
  return (
    <SettingsContext.Consumer>
      {(context) => (
        <ListItem button onClick={() => {}}>
          <ListItemSecondaryAction
            style={{ cursor: "pointer" }}
            onClick={() => {
              onUpdateLayerProp(kode, "erSynlig", !kartlag.erSynlig);
            }}
          >
            {kartlag.erSynlig ? (
              <VisibilityOutlined style={{ color: "#777" }} />
            ) : (
              <VisibilityOffOutlined style={{ color: "#777" }} />
            )}
          </ListItemSecondaryAction>
          <ListItemText primary="Bakgrunnskart" />
        </ListItem>
        /*
                <li draggable>
            <EkspanderingsTopplinje
              erLokalitet={erLokalitet}
              erAktivtLag={erAktivtLag}
              show_current={show_current}
              handleShowCurrent={handleShowCurrent}
              kartlag={kartlag}
              expanded={expanded}
              setExpanded={setExpanded}
              context={context}
              onUpdateLayerProp={onUpdateLayerProp}
              is_current_object={is_current_object}
            />

            {expanded && (
              <>
                <EkspandertUnderMeny
                  erLokalitet={erLokalitet}
                  kode={kode}
                  context={context}
                  bbox={bbox}
                  onFitBounds={onFitBounds}
                  kartlag={kartlag}
                  onRemoveSelectedLayer={onRemoveSelectedLayer}
                  is_current_object={is_current_object}
                  onUpdateLayerProp={onUpdateLayerProp}
                  aktivtFormat={aktivtFormat}
                  activateLayerFromHistory={activateLayerFromHistory}
                  navhist={navhist}
                />

                <EkspandertInnhold
                  kode={kode}
                  aktivtFormat={aktivtFormat}
                  onUpdateLayerProp={onUpdateLayerProp}
                  kartlag={kartlag}
                  is_current_object={is_current_object}
                />
              </>
            )}
          </li>
        */
      )}
    </SettingsContext.Consumer>
  );
};

export default AktivtKartlagElement;
