import React, { useState } from "react";

import { withRouter } from "react-router";
import { SettingsContext } from "../../SettingsContext";
import EkspanderingsTopplinje from "./EkspanderingsTopplinje";
import LegendeElementer from "Innstillinger/Undermenyer/LegendeElementer";
import TemaMeny from "../Bakgrunn/TemaMeny/TemaMeny";
//import FargeMeny from "Innstillinger/Undermenyer/FargeMeny";
import BakgrunnsElementer from "Innstillinger/Undermenyer/BakgrunnsMenyer/BakgrunnsElementer";
import Google from "Innstillinger/Undermenyer/BakgrunnsMenyer/Google";
import tinycolor from "tinycolor2";
import ColorPicker from "Innstillinger/FerdigeMiniElement/ColorPicker";

import { Close, OpenInNew, ColorLens, Edit } from "@material-ui/icons";

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
          />

          {expanded && (
            <>
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
                  className="invisible_icon_button"
                  onClick={() => {
                    closeAll();
                    setSettings(!settings);
                  }}
                >
                  Rediger <Edit />
                </button>

                {kode !== "bakgrunnskart" && (
                  <>
                    <button
                      className="invisible_icon_button"
                      onClick={event => {
                        context.onNavigateToTab("kart");
                        console.log("running", context.onNavigateToTab);
                        onFitBounds(bbox);
                      }}
                    >
                      Zoom til <OpenInNew />
                    </button>

                    <button
                      className="invisible_icon_button remove_icon"
                      onClick={() => onRemoveSelectedLayer(kode)}
                    >
                      Fjern <Close />
                    </button>
                  </>
                )}
              </div>

              {kode === "bakgrunnskart" && theme && (
                <TemaMeny
                  onUpdateLayerProp={onUpdateLayerProp}
                  aktivtFormat={aktivtFormat}
                />
              )}

              {settings && (
                <>
                  {kode === "bakgrunnskart" ? (
                    <>
                      {aktivtFormat.aktivtFormat === "google_hybrid" ||
                      aktivtFormat.aktivtFormat === "google_satellite" ? (
                        <div className="sidebar_element">
                          <h3>Fargefilter for Google-kartbladet</h3>
                          <Google
                            kartlag={kartlag}
                            aktivtFormat={aktivtFormat}
                            onUpdateLayerProp={onUpdateLayerProp}
                          />
                        </div>
                      ) : (
                        <BakgrunnsElementer
                          onUpdateLayerProp={onUpdateLayerProp}
                          aktivtFormat={aktivtFormat}
                        />
                      )}
                    </>
                  ) : (
                    <>
                      {kartlag.barn.length === 0 ? (
                        <ColorPicker
                          color={kartlag.farge}
                          onChange={farge => {
                            const rgbString = tinycolor(
                              farge.rgb
                            ).toRgbString();
                            onUpdateLayerProp(kartlag.kode, "farge", rgbString);
                          }}
                        />
                      ) : (
                        <LegendeElementer
                          kartlag={kartlag}
                          aktivtFormat={aktivtFormat}
                          onUpdateLayerProp={onUpdateLayerProp}
                        />
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </li>
      )}
    </SettingsContext.Consumer>
  );
};

export default withRouter(KartlagListeElement);
