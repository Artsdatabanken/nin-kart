import React from "react";
import { CloudDownload } from "@material-ui/icons";
import språk from "../../../Funksjoner/språk";
import { OpenInNew, KeyboardArrowRight } from "@material-ui/icons";
import SectionExpand from "../../../GjenbruksElement/SectionExpand";

const KatalogKilder = ({ onNavigate, meta, ...props }) => {
  if (!meta) return null;
  const metadata = meta.datakilde;
  if (!metadata) return null;
  const new_url_1 = "https://data.artsdatabanken.no/";
  const new_url_2 = "/logo_24.png";

  return (
    <div className="section">
      <h3>Datakilder</h3>
      <div className="subsection">
        <h4>Dataleverandører </h4>
        {metadata.map(datakilde => {
          return (
            <SectionExpand title={språk(datakilde.tittel)} key={datakilde.kode}>
              <p>
                Lisens: {datakilde.lisenskode}
                <br />
                {datakilde.geonorgeurl && (
                  <a
                    href={datakilde.geonorgeurl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Geonorgeurl:{" "}
                    {datakilde.geonorgeurl.substring(0, 32) + "..."}
                  </a>
                )}
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
              </p>
            </SectionExpand>
          );
        })}
      </div>
      <div className="subsection">
        <h4>Nedlasting </h4>
        <button
          className="kilde_knapp"
          onClick={() => {
            window.location = "https://data.artsdatabanken.no/" + meta.url;
          }}
        >
          <CloudDownload /> <span>Last ned åpne data </span>
          <OpenInNew />
        </button>
      </div>
    </div>
  );
};

export default KatalogKilder;
