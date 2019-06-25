import React from "react";
import KatalogHeaderImage from "./KatalogHeaderImage";
import språk from "Funksjoner/språk";
import prettyKode from "Funksjoner/prettyKode";
import { SettingsContext } from "SettingsContext";

import { OpenInNew } from "@material-ui/icons/";

const KatalogHeader = ({ meta, onFitBounds }) => {
  if (!meta) return null;
  const { kode, bbox, nivå, overordnet } = meta;
  const pkode = prettyKode(kode);
  const tittel = språk(meta.tittel);

  /*
  
  Contains all sidebar elements with header and identification functions,
  such as image, title and

  */
  return (
    <SettingsContext.Consumer>
      {context => (
        <div className="">
          <h1 className="sidebar_title">{tittel}</h1>

          <h2>
            {nivå}
            {context.visKoder && (
              <span className="sidebar_code_field">
                {pkode && <span className=""> - {pkode}</span>}
              </span>
            )}
          </h2>

          {overordnet.length > 0 && (
            <button
              className=""
              onClick={() => {
                context.onNavigateToTab("kart");
                onFitBounds(bbox);
              }}
            >
              <OpenInNew className="classes.iconSmall" />
              Gå til Kartvisning
            </button>
          )}

          <KatalogHeaderImage meta={meta} />
        </div>
      )}
    </SettingsContext.Consumer>
  );
};
export default KatalogHeader;
