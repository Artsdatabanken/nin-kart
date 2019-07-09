import React from "react";
import KatalogHeaderImage from "./KatalogHeaderImage";
import språk from "Funksjoner/språk";
import prettyKode from "Funksjoner/prettyKode";
import { SettingsContext } from "SettingsContext";
import KatalogInformasjon from "../KatalogInformasjon/KatalogInformasjon";
import { OpenInNew } from "@material-ui/icons/";

const KatalogHeader = ({ meta, onFitBounds }) => {
  if (!meta) return null;
  const { kode, bbox, nivå, overordnet, onUpdateLayerProp } = meta;
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

          <div className="katlog_header_images_container">
            <KatalogHeaderImage meta={meta} />
            {overordnet.length > 0 && (
              <button
                className="sidebar_top_map"
                onClick={() => {
                  context.onNavigateToTab("kart");
                  onFitBounds(bbox);
                }}
              >
                <OpenInNew className="classes.iconSmall" />
                Gå til Kartvisning
              </button>
            )}
          </div>
          <KatalogInformasjon
            meta={meta}
            onUpdateLayerProp={onUpdateLayerProp}
          />
        </div>
      )}
    </SettingsContext.Consumer>
  );
};
export default KatalogHeader;
