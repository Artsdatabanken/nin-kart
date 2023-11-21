import React from "react";
import Link from "@material-ui/icons/Link";
import språk from "../../../Funksjoner/språk";

function beskrivelseTolkning(beskrivelse, meta) {
  let listebeskrivelse = null;
  if (meta.kode.includes("AR-")) {
    if (beskrivelse.includes(meta.tittel.sn)) {
      beskrivelse = beskrivelse.split(meta.tittel.sn);
      listebeskrivelse = true;
    }
  }
  if (beskrivelse) {
    return (
      <p>
        {listebeskrivelse
          ? beskrivelse.map((key, index) => {
              if (index !== beskrivelse.length - 1) {
                return (
                  <>
                    {key}
                    <i>{meta.tittel.sn}</i>
                  </>
                );
              }
              return <>{key}</>;
            })
          : beskrivelse}
      </p>
    );
  } else {
    return null;
  }
}

const KatalogInformasjonsBoks = ({ meta }) => {
  let showUrl;
  if (meta.infoUrl) {
    showUrl = meta.infoUrl.substring(0, 32) + "...";
  }
  let beskrivelse = beskrivelseTolkning(språk(meta.beskrivelse), meta);

  if (beskrivelse || meta.infourl) {
    return (
      <div className="subsection">
        <h4>Informasjon om kartlaget</h4>
        {beskrivelse}
        <p>
          {meta.infoUrl && (
            <a href={meta.infoUrl}>
              <Link /> {showUrl}
            </a>
          )}
        </p>
      </div>
    );
  } else {
    return null;
  }
};

export default KatalogInformasjonsBoks;
