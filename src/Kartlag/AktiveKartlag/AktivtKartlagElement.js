import React, { useState } from "react";
import { SettingsContext } from "SettingsContext";
import EkspandertUnderMeny from "./EkspandertMeny/EkspandertUnderMeny";
import EkspandertInnhold from "./EkspandertMeny/EkspandertInnhold";
import EkspanderingsTopplinje from "./EkspanderingsTopplinje";

const AktivtKartlagElement = ({
  kartlag,
  onUpdateLayerProp,
  onRemoveSelectedLayer,
  onFitBounds,
  erAktivtLag,
  show_current,
  handleShowCurrent,
  is_current_object,
  activateLayerFromHistory,
  navhist,
  erLokalitet
}) => {
  let expand_state = is_current_object || false;
  const [expanded, setExpanded] = useState(expand_state);
  if (!kartlag) {
    return null;
  }
  const kode = kartlag.kode;
  const aktivtFormat = kartlag.kart;
  let bbox = kartlag.bbox;
  return (
    <SettingsContext.Consumer>
      {context => (
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
      )}
    </SettingsContext.Consumer>
  );
};

export default AktivtKartlagElement;
