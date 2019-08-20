import språk from "Funksjoner/språk";
import React from "react";
/* 
    KAN TESTES PÅ: 
    - "Fast fjærebelte-bunn" 
    - "Myr- og sumpskogsmark"
    - Ligger under fanen "egenskaper"
    */

const EgenskapVariabel = ({ flagg, onNavigate }) => {
  if (!flagg) return null;
  return Object.keys(flagg).map(kode => {
    const { tittel, url } = flagg[kode];
    const parts = kode.split("-");
    let avatarkode = parts.pop();
    if (avatarkode.length < 2) avatarkode = parts.pop();
    if (avatarkode.length === 4) avatarkode = avatarkode.substring(2);
    return (
      <div className="content_bubble" onClick={() => onNavigate(url)}>
        {harBilde[avatarkode] ? (
          <img
            alt="icon"
            src={`https://data.artsdatabanken.no/${url}/icon.svg`}
          />
        ) : (
          <span className="avatar_kode">{avatarkode}</span>
        )}

        <span>{språk(tittel)}</span>
      </div>
    );
  });
};

const harBilde = { PF: 1, OF: 1 };

export default EgenskapVariabel;
