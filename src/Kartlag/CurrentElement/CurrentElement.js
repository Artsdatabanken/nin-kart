import React, { useState } from "react";
import CurrentLayerSettings from "../AktiveKartlag/EkspandertMeny/CurrentLayerSettings";
import Navigeringsliste from "./Navigeringsliste/Navigeringsliste";
import FavoriteButton from "../Buttons/FavoriteButton";
import SettingsButton from "../Buttons/SettingsButton";
import InfoButton from "../Buttons/InfoButton";
import BackButton from "../Buttons/BackButton";
import MainSectionExpand from "../../GjenbruksElement/MainSectionExpand";
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
  let title = "";
  if (meta.tittel) {
    title = språk(meta.tittel);
    if (title === "undefined" && meta.tittel.sn) {
      title = meta.tittel.sn;
    }
  }
  return (
    <MainSectionExpand
      icon={<Layers />}
      title={isstartpage ? "Velg kartlag" : "Nåværende kartlag"}
    >
      {!isstartpage && (
        <>
          <div className="kartlag_element_header">
            <BackButton onNavigate={onNavigate} backurl={backurl} />
            <h4>{title}</h4>
            <div className="kartlag_element_buttons">
              <InfoButton handleShowInfo={handleShowInfo} showInfo={showInfo} />

              <SettingsButton
                expandedSettings={expandedSettings}
                setExpandedSettings={setExpandedSettings}
                onSetAktivTab={onSetAktivTab}
              />

              <FavoriteButton
                aktiveLag={aktiveLag}
                meta={meta}
                onToggleLayer={onToggleLayer}
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
  );
};

export default CurrentElement;
