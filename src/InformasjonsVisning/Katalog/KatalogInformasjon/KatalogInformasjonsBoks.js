import React from "react";
import Link from "@material-ui/icons/Link";
import språk from "Funksjoner/språk";

const KatalogInformasjonsBoks = ({ meta }) => {
  /*
  
  Currently only availiable for Landskap/Typeinndeling
  
  */
  let showUrl,
    vitNavn,
    førsteDelen,
    sisteDelen = "";
  let { beskrivelse, infoUrl } = meta;
  if (infoUrl) {
    showUrl = infoUrl.substring(0, 32) + "...";
  }

  if (språk(beskrivelse)) {
    vitNavn = språk(beskrivelse).substring(
      språk(beskrivelse).indexOf(meta.tittel.sn),
      meta.tittel.sn.length + språk(beskrivelse).indexOf(meta.tittel.sn)
    );
    førsteDelen = språk(beskrivelse).substring(
      0,
      språk(beskrivelse).indexOf(vitNavn)
    );
    sisteDelen = språk(beskrivelse).substring(
      språk(beskrivelse).indexOf(vitNavn) + vitNavn.length
    );
  }

  if (språk(beskrivelse) !== "undefined") {
    console.log(vitNavn);
  }

  return (
    <>
      {språk(beskrivelse) && (
        <div className="sidebar_description">
          <p>
            {førsteDelen}
            <i>{vitNavn}</i>
            {sisteDelen}
            <br />
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
