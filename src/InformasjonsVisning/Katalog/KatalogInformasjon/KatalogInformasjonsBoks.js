import React from "react";
import Link from "@material-ui/icons/Link";
import språk from "Funksjoner/språk";

const KatalogInformasjonsBoks = ({ meta }) => {
  /*
  
  Currently only availiable for Landskap/Typeinndeling
  
  */
  let showUrl = "";
  let { ingress, infoUrl } = meta;
  if (infoUrl) {
    showUrl = infoUrl.substring(0, 32) + "...";
  }

  return (
    <>
      {språk(ingress) && (
        <div className="sidebar_description">
          <p>
            {språk(ingress)} <br />
            {infoUrl && (
              <a href={infoUrl}>
                <Link /> {showUrl}
              </a>
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default KatalogInformasjonsBoks;
