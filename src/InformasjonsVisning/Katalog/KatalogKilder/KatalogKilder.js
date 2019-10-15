import React from "react";
import { CloudDownload } from "@material-ui/icons";
import språk from "Funksjoner/språk";
import { OpenInNew, KeyboardArrowRight } from "@material-ui/icons";

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
          <div className="kilder_wrap" key={datakilde.kode}>
            <button
              className="kilde_knapp"
              onClick={() => onNavigate(datakilde.url)}
            >
              <img src={new_url_1 + datakilde.url + new_url_2} alt="" />
              <span>
                {språk(datakilde.tittel)} <br />
                {datakilde.kode}
                <br />
              </span>
              <KeyboardArrowRight />
            </button>
            <br />
            Lisens: {datakilde.lisenskode}
            <br />
            Geonorgeurl:
            <br />
            <a
              href={datakilde.geonorgeurl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {datakilde.geonorgeurl.substring(0, 32) + "..."}
            </a>
          </div>
        );
      })}

      <button
        className="kilde_knapp"
        onClick={() => {
          window.location = "https://data.artsdatabanken.no/" + meta.url;
        }}
      >
        <CloudDownload /> Last ned åpne data <OpenInNew />
      </button>
    </div>
  );
};

export default KatalogKilder;
