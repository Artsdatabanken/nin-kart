import React, { useState } from "react";

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
            backgroundPosition: "top"
          }}
          onClick={() => {
            onNavigate(newlandskap.url);
          }}
        />
        <button
          onClick={() => {
            onNavigate(newlandskap.url);
          }}
          className="hide_on_mobile"
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
          {newlandskap.tittel.nb}
        </h2>

        <p className="landskapstype_ingress">
          {newlandskap.ingress.substring(0, 180)}
          <span
            onClick={e => {
              setShowMore(!showMore);
              e.stopPropagation();
            }}
          >
            {showMore ? (
              <>
                {newlandskap.ingress.substring(180, newlandskap.ingress.length)}{" "}
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
                  namelist += new_item.trinn[i].tittel.nb + " ";
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
                  <div className="landskap_badge badge">
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
                    <b>{new_item.tittel.nb}</b> <br />
                    {namelist}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Landskapstype;
