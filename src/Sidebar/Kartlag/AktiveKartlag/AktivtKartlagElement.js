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
  is_current_object
}) => {
  const [expanded, setExpanded] = useState(false);
  const [settings, setSettings] = useState(false);
  const [theme, setTheme] = useState(false);
  function closeAll() {
    setTheme(false);
    setSettings(false);
  }
  const kode = kartlag.kode;
  const aktivtFormat = kartlag.kart;
  let bbox = kartlag.bbox;
  return (
    <SettingsContext.Consumer>
      {context => (
        <li>
          <EkspanderingsTopplinje
            erAktivtLag={erAktivtLag}
            show_current={show_current}
            handleShowCurrent={handleShowCurrent}
            kartlag={kartlag}
            expanded={expanded}
            closeAll={closeAll}
            setExpanded={setExpanded}
            context={context}
            onUpdateLayerProp={onUpdateLayerProp}
            is_current_object={is_current_object}
          />

          {expanded && (
            <>
              <EkspandertUnderMeny
                kode={kode}
                closeAll={closeAll}
                context={context}
                theme={theme}
                setTheme={setTheme}
                setSettings={setSettings}
                bbox={bbox}
                onFitBounds={onFitBounds}
                kartlag={kartlag}
                onRemoveSelectedLayer={onRemoveSelectedLayer}
                is_current_object={is_current_object}
                onUpdateLayerProp={onUpdateLayerProp}
                aktivtFormat={aktivtFormat}
              />

              <EkspandertInnhold
                kode={kode}
                theme={theme}
                aktivtFormat={aktivtFormat}
                onUpdateLayerProp={onUpdateLayerProp}
                kartlag={kartlag}
                settings={settings}
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
