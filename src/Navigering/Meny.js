import React, { useState } from "react";
import Overordnet from "./Navigeringsliste/OverordnetMedEkspander";
import { SettingsContext } from "SettingsContext";
import Navigeringsliste from "./Navigeringsliste/Navigeringsliste";
import språk from "Funksjoner/språk";
import { kodeSuffix2 } from "./Navigeringsliste/NavigeringslisteFunksjoner/kodeSuffix";
import {
  ListItemAvatar,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
} from "@material-ui/core";
import { Add, Delete, Settings } from "@material-ui/icons";

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
  const kodesuffix = kodeSuffix2(meta.kode, meta.overordnet);
  return (
    <SettingsContext.Consumer>
      {(context) => (
        <div
          //      className={
          //          (aktivTab === "meny" ? "mobile_on" : "mobile_off") + " sidebar"
          //      }
          style={{
            paddingTop: 16,
            _zIndex: expanded && aktivTab === "kartlag" ? 20 : 1,
            _height: expanded && aktivTab === "kartlag" && "auto",
            _maxHeight: expanded && aktivTab === "kartlag" && "100%",
            _borderBottom:
              expanded && aktivTab === "kartlag" && "2px solid $bright-nin",
          }}
        >
          <div style={{}}>
            <>
              <Overordnet
                overordnet={meta.overordnet}
                onNavigate={onNavigate}
                setExpanded={setExpanded}
              />

              <ListItem
                button
                onClick={() => {
                  onSetAktivTab("kartlaginnstillinger");
                }}
              >
                {false && (
                  <ListItemAvatar>
                    <Settings style={{ color: "rgba(0,0,0,0.54)" }} />
                  </ListItemAvatar>
                )}
                <ListItemText
                  primary={"▾ " + tittel}
                  secondary={
                    meta.nivå &&
                    meta.nivå + (context.visKoder ? ` (${kodesuffix})` : "")
                  }
                ></ListItemText>
                {
                  <ListItemSecondaryAction
                    onClick={(e) => {
                      onToggleLayer();
                      e.stopPropagation();
                    }}
                  >
                    {aktiveLag[meta.kode] ? (
                      <Tooltip
                        title="Fjern fra mine kartlag"
                        aria-label="fjern fra mine kartlag"
                      >
                        <IconButton>
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip
                        title="Legg til mine kartlag"
                        aria-label="legg til mine kartlag"
                      >
                        <IconButton>
                          <Add />
                        </IconButton>
                      </Tooltip>
                    )}
                  </ListItemSecondaryAction>
                }
              </ListItem>

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
            </>
          </div>
        </div>
      )}
    </SettingsContext.Consumer>
  );
};

export default Meny;
