import React from "react";
import KatalogHeaderImage from "./KatalogHeaderImage";
import språk from "Funksjoner/språk";
import prettyKode from "Funksjoner/prettyKode";
import { SettingsContext } from "SettingsContext";
import KatalogInformasjon from "../KatalogInformasjon/KatalogInformasjon";

const KatalogHeader = ({ meta }) => {
  if (!meta) return null;
  const { kode, nivå, onUpdateLayerProp } = meta;
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
          <div className="katlog_header_images_container">
            <KatalogHeaderImage meta={meta} />
            <div className="katlog_header_text_container">
              <h2>
                {nivå}
                {context.visKoder && (
                  <span className="sidebar_code_field">
                    {pkode && <span className=""> - {pkode}</span>}
                  </span>
                )}
              </h2>
              <KatalogInformasjon
                meta={meta}
                onUpdateLayerProp={onUpdateLayerProp}
              />
            </div>
          </div>
        </div>
      )}
    </SettingsContext.Consumer>
  );
};
export default KatalogHeader;
