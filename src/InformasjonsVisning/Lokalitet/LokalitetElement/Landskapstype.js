import React from "react";

const Landskapstype = ({ onNavigate, newlandskap }) => {
  if (!newlandskap) return null;
  let newgradient_components;
  if (newlandskap.gradient) {
    newgradient_components = newlandskap.gradient["NN-LA-KLG"].barn;
  }

  return (
    <div className="landskapstype_visning">
      <div className="image_and_link">
        <img src={newlandskap.bilde.foto.url} alt="" />
        <button
          onClick={() => {
            onNavigate(newlandskap.url);
          }}
        >
          Gå til informasjonsside
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
          {false ? (
            <span>
              {newlandskap.ingress.substring(180, newlandskap.ingress.length)}
            </span>
          ) : (
            "..."
          )}
        </p>

        <div className="lokasjon_badge_container">
          {newgradient_components &&
            Object.keys(newgradient_components).map((value, index) => {
              let new_item = newgradient_components[value];
              let namelist = "";
              let imgurl = "https://data.artsdatabanken.no/";
              for (let i in new_item.trinn) {
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
