import React, { useState } from "react";
import Overordnet from "./Navigeringsliste/OverordnetMedEkspander";
import { SettingsContext } from "../SettingsContext";
import Navigeringsliste from "./Navigeringsliste/Navigeringsliste";
import språk from "../Funksjoner/språk";
import { kodeSuffix2 } from "./Navigeringsliste/NavigeringslisteFunksjoner/kodeSuffix";
import {
  ListItemAvatar,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip
} from "@material-ui/core";
import Utforsk from "../HamburgerMeny/Utforsk/Utforsk";
import { Add, Delete, Settings, Home } from "@material-ui/icons";

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
  const kodesuffix = kodeSuffix2(meta.kode, meta.overordnet);
  // Overordnet = Breadcrumb

  function emptyfunction() {
    console.log("empty");
  }

  return (
    <SettingsContext.Consumer>
      {context => (
        <div className="navigeringscontainer">
          {path === "/Natur_i_Norge" ? (
            <Utforsk
              parent={parent}
              props={this}
              context={context}
              handleHovedMeny={emptyfunction}
            />
          ) : (
            <>
              {false && (
                <Overordnet
                  overordnet={meta.overordnet}
                  onNavigate={onNavigate}
                  setExpanded={setExpanded}
                />
              )}

              <ListItem
                button
                onClick={() => {
                  onNavigate("/Natur_i_Norge");
                }}
              >
                <ListItemAvatar>
                  <Home style={{ color: "rgba(0,0,0,0.54)" }} />
                </ListItemAvatar>

                <ListItemText primary={"Hjem"}></ListItemText>
              </ListItem>

              <ListItem
                button
                onClick={() => {
                  onSetAktivTab("kartlaginnstillinger");
                }}
              >
                {true && (
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
          )}
        </div>
      )}
    </SettingsContext.Consumer>
  );
};

export default Meny;
