import React from "react";

const ForsideDataleverandør = props => {
  return (
    <div className="frontpage_sources">
      <a
        href="https://www.miljodirektoratet.no/"
        className="frontpage_link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://data.artsdatabanken.no/Datakilde/Milj%C3%B8direktoratet/logo_48.png"
          alt="logo for miljødirektoratet"
        />
        <br />
        Miljø-
        <br />
        direktoratet
        <br />
      </a>
      <a
        href="https://www.kartverket.no"
        className="frontpage_link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://data.artsdatabanken.no/Datakilde/Kartverket/logo_48.png"
          alt="logo for kartverket"
        />
        <br />
        Kartverket
        <br />
      </a>
      <a
        href="https://www.nina.no/"
        className="frontpage_link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://data.artsdatabanken.no/Datakilde/Norsk_institutt_for_naturforskning/logo_48.png"
          alt="logo for nina"
        />{" "}
        <br />
        NINA
        <br />
      </a>
      <br />
      <a
        href="https://www.nibio.no/"
        className="frontpage_link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://data.artsdatabanken.no/Datakilde/Norsk_institutt_for_bio%C3%B8konomi/logo_48.png"
          alt="logo for nibio"
        />
        <br />
        NIBIO
      </a>
      <a
        href="https://www.ngu.no/"
        className="frontpage_link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://data.artsdatabanken.no/Datakilde/Norges_Geologiske_Unders%C3%B8kelse/logo_48.png"
          alt="logo for ngu"
        />
        <br />
        NGU
      </a>
      <a
        href="https://www.ssb.no/"
        className="frontpage_link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://data.artsdatabanken.no/Datakilde/Statistisk_sentralbyr%C3%A5/logo_48.png"
          alt="logo for ssb"
        />
        <br />
        SSB
      </a>
    </div>
  );
};

export default ForsideDataleverandør;
