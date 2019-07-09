import React from "react";
import { CloudDownload } from "@material-ui/icons";
import språk from "Funksjoner/språk";

const KatalogKilder = ({ onNavigate, meta, ...props }) => {
  if (!meta) return null;
  const metadata = meta.datakilde;
  if (!metadata) return null;
  const new_url_1 = "https://data.artsdatabanken.no/";
  const new_url_2 = "/logo_24.png";

  return (
    <div className="kilde_box">
      <h1>Datakilder</h1>
      {metadata.map(datakilde => {
        return (
          <button
            className="kilde_knapp"
            onClick={() => onNavigate(datakilde.url)}
          >
            <img src={new_url_1 + datakilde.url + new_url_2} alt="" />
            {språk(datakilde.tittel)} <br />
            {datakilde.kode}
          </button>
        );
      })}

      <button
        className="kilde_knapp"
        onClick={() => {
          window.location = "https://data.artsdatabanken.no/" + props.url;
        }}
      >
        <CloudDownload /> Last ned åpne data
      </button>
    </div>
  );
};

export default KatalogKilder;
