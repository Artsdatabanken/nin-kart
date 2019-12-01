import React, { useState } from "react";
import språk from "Funksjoner/språk";

const Landskapstype = ({ onNavigate, newlandskap }) => {
  const [showMore, setShowMore] = useState(false);
  if (!newlandskap) return null;
  let newgradient_components;
  if (newlandskap.gradient) {
    newgradient_components = newlandskap.gradient["NN-LA-KLG"].barn;
  }

  return (
    <div className="landskapstype_visning">
      <div className="image_and_link">
        <div
          className="sidebar_top_image"
          style={{
            backgroundImage: "url(" + newlandskap.bilde.foto.url + ")",
            backgroundRepeat: "no-Repeat",
            backgroundPosition: "top",
            backgroundSize: "cover"
          }}
          onClick={() => {
            onNavigate(newlandskap.url);
          }}
        />
        <button
          onClick={() => {
            onNavigate(newlandskap.url);
          }}
          className="hide_on_mobile lokasjonboksknapper"
        >
          Gå til infoside
        </button>
      </div>

      <div className="not_image_and_link">
        <h2
          onClick={() => {
            onNavigate(newlandskap.url);
          }}
        >
          {språk(newlandskap.tittel)}
        </h2>

        <p className="landskapstype_ingress">
          {språk(newlandskap.beskrivelse).substring(0, 180)}
          <span
            onClick={e => {
              setShowMore(!showMore);
              e.stopPropagation();
            }}
          >
            {showMore ? (
              <>
                {språk(newlandskap.beskrivelse) &&
                  språk(newlandskap.beskrivelse).substring(180)}
                ... [se mindre]
              </>
            ) : (
              <> ... [se mer]</>
            )}
          </span>
        </p>

        <div className="lokasjon_badge_container">
          {newgradient_components &&
            Object.keys(newgradient_components).map((value, index) => {
              let new_item = newgradient_components[value];
              let namelist = "";
              let imgurl = "https://data.artsdatabanken.no/";
              for (var i in new_item.trinn) {
                if (new_item.trinn[i]["på"]) {
                  namelist += språk(new_item.trinn[i].tittel) + " ";
                  imgurl += new_item.trinn[i].url + "/foto_408.jpg";
                }
              }
              return (
                <div
                  key={index}
                  onClick={() => {
                    onNavigate(new_item.url);
                  }}
                >
                  <button className="landskap_badge badge">
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
                    <b>{språk(new_item.tittel)}</b> <br />
                    {namelist}
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Landskapstype;
