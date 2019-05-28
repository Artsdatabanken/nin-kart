import React from "react";
import { SettingsContext } from "SettingsContext";
import prettyKode from "Funksjoner/prettyKode";
import { OpenInNew } from "@material-ui/icons/";
import språk from "Funksjoner/språk";

const KatalogHeaderTittelBlokk = ({ meta, children, onFitBounds }) => {
  if (!meta) return null;
  const { kode, bbox, nivå, overordnet } = meta;

  /*
  Contains Title block only.
  */
  const pkode = prettyKode(kode);
  const tittel = språk(meta.tittel);

  return (
    <SettingsContext.Consumer>
      {context => (
        <div className="sidebar_title_container sidebar_element">
          <h1 className="sidebar_title">{tittel}</h1>
          <h2>
            {nivå}
            {context.visKoder && (
              <span className="sidebar_code_field">
                {pkode && <span className=""> - {pkode}</span>}
              </span>
            )}
          </h2>
          {children}
          {overordnet.length > 0 && (
            <button
              className="zoom_button"
              onClick={() => {
                context.onNavigateToTab("kart");
                onFitBounds(bbox);
              }}
            >
              <OpenInNew className="classes.iconSmall" />
              Zoom til
            </button>
          )}
        </div>
      )}
    </SettingsContext.Consumer>
  );
};
export default KatalogHeaderTittelBlokk;
