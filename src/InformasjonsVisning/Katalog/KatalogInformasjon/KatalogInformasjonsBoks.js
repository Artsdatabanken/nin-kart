import React from "react";
import Link from "@material-ui/icons/Link";
import språk from "Funksjoner/språk";

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
      <>
        {beskrivelse}
        <p>
          {meta.infoUrl && (
            <a href={meta.infoUrl}>
              <Link /> {showUrl}
            </a>
          )}
        </p>
      </>
    );
  } else {
    return null;
  }
};

export default KatalogInformasjonsBoks;
