import React from "react";
import Link from "@material-ui/icons/Link";

const KatalogInformasjonsBoks = ({ meta }) => {
  /*
  
  Currently only availiable for Landskap/Typeinndeling
  
  */
  const { ingress, infoUrl } = meta;
  return (
    <>
      {ingress && (
        <div className="sidebar_description sidebar_element">
          <p>
            {ingress} <br />
            {infoUrl && (
              <a href={infoUrl}>
                <Link /> Les mer
              </a>
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default KatalogInformasjonsBoks;
