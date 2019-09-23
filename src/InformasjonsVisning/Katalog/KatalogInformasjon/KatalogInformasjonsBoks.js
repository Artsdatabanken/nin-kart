import React from "react";
import Link from "@material-ui/icons/Link";
import språk from "Funksjoner/språk";

const KatalogInformasjonsBoks = ({ meta }) => {
  /*
  
  Currently only availiable for Landskap/Typeinndeling
  
  */
  let { ingress, infoUrl } = meta;
  if (meta.tittel.nb === "Administrativ grense") {
    ingress =
      "Norge er blant annet bygget opp av det vi kjenner som fastlandet med fylker og kommuner, som er en betydelig del av vårt territorialområde. Men Norge inneholder også flere øyer og øygrupper, og havområder som omtales som vår kontinentalsokkel.";
  }

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
