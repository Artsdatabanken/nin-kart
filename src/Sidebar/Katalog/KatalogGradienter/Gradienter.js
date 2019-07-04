import React from "react";
//import Gradient from "./LinearGauge";

const Gradienter = ({
  gradient,
  onNavigate,
  onMouseEnter,
  onMouseLeave,
  opplyst,
  visKoder
}) => {
  return (
    <>
      {Object.entries(gradient).map(([kode, gr]) => (
        <>
          {gr.trinn.map(e => {
            if (e["på"] === true) {
              let url =
                "https://data.artsdatabanken.no/" + e.url + "/foto_408.jpg";
              return (
                <div className="badge">
                  <div
                    className="badge_image"
                    style={{
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundImage: "url(" + url + ")"
                    }}
                    onClick={() => onNavigate(e.url)}
                  />

                  <b>{gr.tittel.nb}</b>
                  <span>{e.tittel.nb}</span>
                </div>
              );
            }
            return null;
          })}

          {/*
      
      <Gradient
        key={kode}
        tittel={gr.tittel.nb}
        url={gr.url}
        kode={gr.kode}
        visKoder={visKoder}
        trinn={gr.trinn}
        onNavigate={onNavigate}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        opplyst={opplyst}
      />
      */}
        </>
      ))}
    </>
  );
};

export default Gradienter;
