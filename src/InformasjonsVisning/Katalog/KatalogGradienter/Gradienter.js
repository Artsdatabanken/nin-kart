import React from "react";
import språk from "Funksjoner/språk";
import config from "../../../Funksjoner/config";

const Gradienter = ({ gradient, onNavigate, title }) => {
  /// Gradient er navnet på noden
  /// Barna av gradient heter
  return (
    <>
      <h1>{title}</h1>

      {Object.entries(gradient).map(([kode], index) => {
        let item = gradient[kode];
        let gradientelement = item.trinn;

        return (
          <div key={index} className="badge_container">
            <h2>{item.tittel.nb}</h2>
            {gradientelement.map((item, index) => {
              let aktiv = item["på"];
              return (
                <button
                  className="badge"
                  key={item.tittel.nb + index}
                  style={{ opacity: aktiv ? "1" : "0.2" }}
                  onClick={e => {
                    onNavigate(item.url);
                  }}
                >
                  <div
                    className="badge_image"
                    style={{
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundImage: "url(" + config.foto(item.url) + ")"
                    }}
                  />
                  <br />
                  <b>{språk(item.tittel)}</b>
                  {aktiv === true ? "Til stede" : "Ikke tilstede"}
                  <br />
                </button>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default Gradienter;
