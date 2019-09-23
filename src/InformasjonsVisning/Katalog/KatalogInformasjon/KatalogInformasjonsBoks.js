import React from "react";
import Link from "@material-ui/icons/Link";
import språk from "Funksjoner/språk";

const KatalogInformasjonsBoks = ({ meta }) => {
  /*
  
  Currently only availiable for Landskap/Typeinndeling
  
  */
  let { ingress, infoUrl } = meta;

  return (
    <>
      {språk(ingress) && (
        <div className="sidebar_description">
          <p>
            {språk(ingress)} <br />
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
