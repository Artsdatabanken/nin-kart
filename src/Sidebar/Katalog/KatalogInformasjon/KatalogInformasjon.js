import React from "react";
import Detaljeringsgrad from "./Detaljeringsgrad";
import KatalogInformasjonsBoks from "./KatalogInformasjonsBoks";

const KatalogInformasjon = ({ meta, onUpdateLayerProp }) => {
  /*
  
  Contains pure information components.
  
  */
  if (!meta) return null;
  const { kode, depth } = meta;

  return (
    <>
      {kode === "NN-LA-TI" && (
        <Detaljeringsgrad onUpdateLayerProp={onUpdateLayerProp} value={depth} />
      )}

      <KatalogInformasjonsBoks meta={meta} />
    </>
  );
};
export default KatalogInformasjon;
