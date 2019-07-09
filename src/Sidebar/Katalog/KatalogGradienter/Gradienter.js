import React from "react";
//import { object } from "prop-types";
//import Gradient from "./LinearGauge";

const Gradienter = ({
  gradient,
  onNavigate,
  onMouseEnter,
  onMouseLeave,
  opplyst,
  visKoder
}) => {
  function getAmount(trinn) {
    let count = 0;
    let url = "";
    let namelist = [];
    trinn.map(e => {
      if (e["på"] === true) {
        count += 1;
        url = "https://data.artsdatabanken.no/" + e.url + "/foto_408.jpg";
        namelist.push(e.tittel.nb);
      }
    });
    return [count, url, namelist];
  }

  return (
    <>
      {Object.entries(gradient).map(([kode, gr]) => (
        <>
          <div className="badge">
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
              {" "}
              {getAmount(gr.trinn)[0]} / {Object.keys(gr.trinn).length}
            </span>

            {getAmount(gr.trinn)[2].map(item => {
              return (
                <>
                  {item}
                  <br />
                </>
              );
            })}
          </div>

          {gr.trinn.map(e => {
            if (e["på"] === true) {
              //   let url =
              //   "https://data.artsdatabanken.no/" + e.url + "/foto_408.jpg";
              return "" /*
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
                </div>*/;
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
