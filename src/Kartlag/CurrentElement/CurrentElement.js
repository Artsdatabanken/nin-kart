import React, { useState } from "react";
import CurrentLayerSettings from "../AktiveKartlag/EkspandertMeny/CurrentLayerSettings";
import Overordnet from "./Navigeringsliste/OverordnetMedEkspander";
import Navigeringsliste from "./Navigeringsliste/Navigeringsliste";
import språk from "../../Funksjoner/språk";
import { Tooltip } from "@material-ui/core";
import {
  ArrowBack,
  FavoriteBorder,
  Favorite,
  Layers,
  Settings,
  Info
} from "@material-ui/icons";

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
  const [expanded, setExpanded] = useState(false);
  const [expandedSettings, setExpandedSettings] = useState(false);

  let tittel = "hjelp";
  if (meta) {
    tittel = språk(meta.tittel);
    if (tittel === "undefined" && meta.tittel.sn) {
      tittel = meta.tittel.sn;
    }
  }
  if (!meta) return null;

  let backurl = "/start";
  if (meta.overordnet !== undefined && meta.overordnet[0] !== undefined) {
    backurl = meta.overordnet[0].url;
  }
  return (
    <div className="section">
      <h3 className="kartlag_header">
        <Layers />
        {isstartpage ? "Velg kartlag" : "Nåværende kartlag"}
      </h3>
      {false && (
        <Overordnet
          overordnet={meta.overordnet}
          onNavigate={onNavigate}
          setExpanded={setExpanded}
        />
      )}
      {!isstartpage && (
        <>
          <div className="kartlag_element_header">
            <button
              onClick={() => {
                onNavigate(backurl);
              }}
            >
              <Tooltip title="Åpne informasjon" aria-label="åpne informasjon">
                <ArrowBack />
              </Tooltip>
            </button>
            <span>{tittel}</span>
            <div className="kartlag_element_buttons">
              <button
                onClick={() => {
                  handleShowInfo(!showInfo);
                }}
              >
                <Tooltip title="Åpne informasjon" aria-label="åpne informasjon">
                  <Info />
                </Tooltip>
              </button>

              <button
                onClick={() => {
                  onSetAktivTab("kartlaginnstillinger");
                  setExpandedSettings(!expandedSettings);
                }}
              >
                <Tooltip
                  title="Åpne innstillinger"
                  aria-label="åpne innstillinger"
                >
                  <Settings />
                </Tooltip>
              </button>

              <button
                onClick={e => {
                  onToggleLayer();
                  e.stopPropagation();
                }}
              >
                {aktiveLag[meta.kode] ? (
                  <Tooltip
                    title="Fjern fra mine kartlag"
                    aria-label="fjern fra mine kartlag"
                  >
                    <Favorite />
                  </Tooltip>
                ) : (
                  <Tooltip
                    title="Legg til mine kartlag"
                    aria-label="legg til mine kartlag"
                  >
                    <FavoriteBorder />
                  </Tooltip>
                )}
              </button>
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
      {true && (
        <Navigeringsliste
          parentkode={meta ? meta.kode : "kode"}
          metadata={meta && meta.barn}
          setExpanded={setExpanded}
          onNavigate={onNavigate}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          opplyst={opplyst}
          onUpdateMetaProp={onUpdateMetaProp}
          onUpdateLayerProp={onUpdateLayerProp}
        />
      )}
      {!expanded && false && <b>Do we still use this variable?</b>}
    </div>
  );
};

export default CurrentElement;
