import React, { useState } from "react";
import Overordnet from "./Navigeringsliste/OverordnetMedEkspander";
import { SettingsContext } from "../SettingsContext";
import Navigeringsliste from "./Navigeringsliste/Navigeringsliste";
import språk from "../Funksjoner/språk";
//import { kodeSuffix2 } from "./Navigeringsliste/NavigeringslisteFunksjoner/kodeSuffix";
import { IconButton, Tooltip } from "@material-ui/core";
//import Utforsk from "../HamburgerMeny/Utforsk/Utforsk";
import {
  //KeyboardArrowDown,
  ArrowBack,
  FavoriteBorder,
  Favorite,
  Settings,
  Layers,
  Info
} from "@material-ui/icons";

const Meny = ({
  aktiveLag,
  aktivTab,
  onSetAktivTab,
  meta,
  onNavigate,
  onUpdateMetaProp,
  opplyst,
  onMouseEnter,
  onMouseLeave,
  onToggleLayer,
  path,
  handleHovedMeny,
  isstartpage,
  parent
}) => {
  /*
Intern navigasjon innad på en side.
Sidebarmeny-navigeringen.
  */
  const [expanded, setExpanded] = useState(false);
  let tittel = "hjelp";
  if (meta) {
    tittel = språk(meta.tittel);
    if (tittel === "undefined" && meta.tittel.sn) {
      tittel = meta.tittel.sn;
    }
  }
  if (!meta) return null;
  //const kodesuffix = kodeSuffix2(meta.kode, meta.overordnet);
  // Overordnet = Breadcrumb

  console.log(expanded);

  let backurl = "/start";
  if (meta.overordnet !== undefined && meta.overordnet[0] !== undefined) {
    backurl = meta.overordnet[0].url;
  }

  return (
    <SettingsContext.Consumer>
      {context => (
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
                  <Tooltip
                    title="Åpne informasjon"
                    aria-label="åpne informasjon"
                  >
                    <ArrowBack />
                  </Tooltip>
                </button>
                <span>{tittel}</span>
                <div className="kartlag_element_buttons">
                  <button
                    onClick={() => {
                      onSetAktivTab("informasjon");
                    }}
                  >
                    <Tooltip
                      title="Åpne informasjon"
                      aria-label="åpne informasjon"
                    >
                      <Info />
                    </Tooltip>
                  </button>
                  <button
                    onClick={() => {
                      onSetAktivTab("kartlaginnstillinger");
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
            />
          )}
        </div>
      )}
    </SettingsContext.Consumer>
  );
};

export default Meny;
