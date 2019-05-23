import React, { useState } from "react";

import { withRouter } from "react-router";
import { SettingsContext } from "../../SettingsContext";
import EkspandertUnderMeny from "./EkspandertUnderMeny";
import EkspandertInnhold from "./EkspandertInnhold";
import EkspanderingsTopplinje from "./EkspanderingsTopplinje";
//import FargeMeny from "Innstillinger/Undermenyer/FargeMeny";

const KartlagListeElement = ({
  kartlag,
  onUpdateLayerProp,
  onRemoveSelectedLayer,
  onFitBounds
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
            kartlag={kartlag}
            expanded={expanded}
            closeAll={closeAll}
            setExpanded={setExpanded}
            context={context}
            onUpdateLayerProp={onUpdateLayerProp}
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
                context={context}
                bbox={bbox}
                onFitBounds={onFitBounds}
                onRemoveSelectedLayer={onRemoveSelectedLayer}
              />

              <EkspandertInnhold
                kode={kode}
                theme={theme}
                aktivtFormat={aktivtFormat}
                onUpdateLayerProp={onUpdateLayerProp}
                kartlag={kartlag}
                settings={settings}
              />
            </>
          )}
        </li>
      )}
    </SettingsContext.Consumer>
  );
};

export default withRouter(KartlagListeElement);
