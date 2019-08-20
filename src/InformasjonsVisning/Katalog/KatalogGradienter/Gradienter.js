import React from "react";

const Gradienter = ({ gradient, onNavigate, title }) => {
  function getAmount(trinn) {
    let count = 0;
    let url = "";
    let namelist = [];

    for (let item in trinn) {
      let e = trinn[item];
      if (e["på"] === true) {
        count += 1;
        url = "https://data.artsdatabanken.no/" + e.url + "/foto_408.jpg";
        namelist.push(e.tittel.nb);
      }
    }
    return [count, url, namelist];
  }

  return (
    <>
      <h1>{title}</h1>
      {Object.entries(gradient).map(([kode, gr]) => (
        <div className="badge" key={gr.tittel.nb}>
          <div
            className="badge_image"
            style={{
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundImage: "url(" + getAmount(gr.trinn)[1] + ")"
            }}
            onClick={() => {
              onNavigate(gr.url);
            }}
          />

          <b>{gr.tittel.nb}</b>
          <span>
            {getAmount(gr.trinn)[0]} / {Object.keys(gr.trinn).length}
          </span>

          {getAmount(gr.trinn)[2].map(item => {
            return (
              <div key={item}>
                {item}
                <br />
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
};

export default Gradienter;
