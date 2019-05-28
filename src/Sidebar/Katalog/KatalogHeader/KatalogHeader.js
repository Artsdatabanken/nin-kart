import React from "react";
import KatalogHeaderImage from "./KatalogHeaderImage";
import KatalogHeaderTittelBlokk from "./KatalogHeaderTittelBlokk";

const KatalogHeader = ({ meta, onFitBounds }) => {
  /*
  
  Contains all sidebar elements with header and identification functions,
  such as image, title and

  */
  return (
    <div className="sidebar_top_area sidebar_background_element">
      <div className="sidebar_element page_topic_header" />

      <KatalogHeaderImage meta={meta} />
      <KatalogHeaderTittelBlokk meta={meta} onFitBounds={onFitBounds} />
    </div>
  );
};
export default KatalogHeader;
