import React, { useState } from "react";
import CurrentLayerSettings from "./CurrentLayerSettings";
import LayerSubElementListe from "./LayerSubElementListe";
import FavoriteButton from "../Buttons/FavoriteButton";
import SettingsButton from "../Buttons/SettingsButton";
import InfoButton from "../Buttons/InfoButton";
import MainSectionExpand from "../../GjenbruksElement/MainSectionExpand";
import getTitle from "../../Funksjoner/getTitle";
import { Layers } from "@material-ui/icons";

const CurrentElement = ({
  aktiveLag,
  meta,
  onNavigate,
  onUpdateMetaProp,
  opplyst,
  onMouseEnter,
  onMouseLeave,
  onToggleLayer,
  onSetAktivTab,
  isstartpage,
  handleShowInfo,
  onUpdateLayerProp,
  showInfo
}) => {
  /*
Intern navigasjon innad på en side.
Sidebarmeny-navigeringen.
  */
  const [expandedSettings, setExpandedSettings] = useState(false);
  if (!meta) return null;

  return (
    <>
      <MainSectionExpand
        icon={<Layers />}
        title={isstartpage ? "Velg kartlag" : "Nåværende kartlag"}
      >
        {!isstartpage && (
          <>
            <div className="kartlag_element_header layer_list_element">
              <h4>{getTitle(meta)}</h4>
              <div className="kartlag_element_buttons">
                <InfoButton
                  handleShowInfo={handleShowInfo}
                  showInfo={showInfo}
                />
                <SettingsButton
                  expandedSettings={expandedSettings}
                  setExpandedSettings={setExpandedSettings}
                  onSetAktivTab={onSetAktivTab}
                />

                <FavoriteButton
                  onToggleLayer={onToggleLayer}
                  turnedOn={aktiveLag[meta.kode]}
                />
              </div>
            </div>
            {expandedSettings && (
              <CurrentLayerSettings
                meta={meta}
                onUpdateLayerProp={onUpdateLayerProp}
              />
            )}
          </>
        )}

        <LayerSubElementListe
          parentkode={meta ? meta.kode : "kode"}
          metadata={meta && meta.barn}
          onNavigate={onNavigate}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          opplyst={opplyst}
          onUpdateMetaProp={onUpdateMetaProp}
          onUpdateLayerProp={onUpdateLayerProp}
        />
      </MainSectionExpand>
    </>
  );
};

export default CurrentElement;
