import React, { useState } from "react";
import CurrentLayerSettings from "../AktiveKartlag/EkspandertMeny/CurrentLayerSettings";
import Navigeringsliste from "./Navigeringsliste";
import FavoriteButton from "../Buttons/FavoriteButton";
import SettingsButton from "../Buttons/SettingsButton";
import InfoButton from "../Buttons/InfoButton";
import BackButton from "../Buttons/BackButton";
import MainSectionExpand from "../../GjenbruksElement/MainSectionExpand";
import getTitle from "../../Funksjoner/getTitle";
import språk from "../../Funksjoner/språk";
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
  let backurl = "/start";
  if (meta.overordnet !== undefined && meta.overordnet[0] !== undefined) {
    backurl = meta.overordnet[0].url;
  }

  return (
    <>
      <MainSectionExpand
        icon={<Layers />}
        title={isstartpage ? "Velg kartlag" : "Nåværende kartlag"}
      >
        {!isstartpage && (
          <>
            <div className="kartlag_element_header">
              <SettingsButton
                expandedSettings={expandedSettings}
                setExpandedSettings={setExpandedSettings}
                onSetAktivTab={onSetAktivTab}
              />
              <h4>{getTitle(meta)}</h4>
              <div className="kartlag_element_buttons">
                <InfoButton
                  handleShowInfo={handleShowInfo}
                  showInfo={showInfo}
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

        <Navigeringsliste
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
