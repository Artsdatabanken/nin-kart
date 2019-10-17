import React from "react";
import språk from "Funksjoner/språk";

const Gradienter = ({ gradient, onNavigate, title }) => {
  //console.log(gradient);
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
              let img_url =
                "https://data.artsdatabanken.no/" + item.url + "/foto_408.jpg";
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
                      backgroundImage: "url(" + img_url + ")"
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
