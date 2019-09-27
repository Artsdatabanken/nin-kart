import React from "react";
import språk from "Funksjoner/språk";

const LokasjonBadge = ({ onNavigate, value, index }) => {
  const imgurl = "https://data.artsdatabanken.no/" + value.bilde;
  return (
    <div
      key={index}
      onClick={() => {
        onNavigate(value.url);
      }}
    >
      <button
        className="badge"
        key={index}
        style={{ opacity: value.aktiv ? "1" : "0.2" }}
      >
        <div
          className="badge_image"
          style={{
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundImage: "url(" + imgurl + ")"
          }}
          onClick={() => {
            onNavigate(value.url);
          }}
        />
        <br />
        <b>{språk(value.tittel)}</b>
        <br />
        <span>{value.kode}</span>
        <span>{value.aktiv && "Finnes i området "}</span>
      </button>
    </div>
  );
};

export default LokasjonBadge;
