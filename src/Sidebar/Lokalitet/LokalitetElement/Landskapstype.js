import React from "react";

const Landskapstype = ({ onNavigate, data, newlandskap }) => {
  let naturtype = [];
  let landskap = [];
  const miljvar = Object.keys(data.environment).sort();
  for (let i in miljvar) {
    const miljøvariabelkode = miljvar[i].substring(0, 5);
    if (miljøvariabelkode === "NN-NA") {
      naturtype.push(miljvar[i]);
    } else if (miljøvariabelkode === "NN-LA") {
      landskap.push(miljvar[i]);
    }
  }
  if (!newlandskap) return null;
  let newgradient_components;
  if (newlandskap.gradient) {
    newgradient_components = newlandskap.gradient["NN-LA-KLG"].barn;
  }

  return (
    <div className="">
      <div className="landskapstype_visning">
        <h3
          onClick={() => {
            onNavigate(newlandskap.url);
          }}
        >
          {newlandskap.tittel.nb}
        </h3>
        <p className="landskapstype_ingress">
          {newlandskap.ingress.substring(0, 200)}... >
        </p>
        <br />

        <img src={newlandskap.bilde.foto.url} alt="" />
        <div className="lokasjon_badge_container">
          {newgradient_components &&
            Object.keys(newgradient_components).map((value, index) => {
              let new_item = newgradient_components[value];
              // let counter = 0;
              let namelist = "";
              let imgurl = "https://data.artsdatabanken.no/";
              for (let i in new_item.trinn) {
                if (new_item.trinn[i]["på"]) {
                  //counter += 1;
                  namelist += new_item.trinn[i].tittel.nb + " ";
                  imgurl += new_item.trinn[i].url + "/foto_408.jpg";
                }
              }
              return (
                <>
                  <div
                    key={index}
                    onClick={() => {
                      onNavigate(new_item.url);
                    }}
                  >
                    <div className="landskap_badge badge" key={index}>
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
                      {/*{new_item.kode}<br/>*/}
                      {/*{counter}/{new_item.trinn.length}*/}
                      <b>{new_item.tittel.nb}</b> <br />
                      {namelist}
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>

      {/*naturtype.map((kode, index) => {
        if (!data.environment[kode]) return null;
        const miljøvariabel = data.environment[kode];
        const barn = miljøvariabel.barn;
        return (
          <div className="landskapstype_visning" key={index}>
            <h3>Navn på landskapstype her</h3>
            <img src={miljøvariabel.bilde.foto.url} alt="" />

            <div className="lokasjon_badge_container">
              {barn &&
                barn.map((value, index) => {
                  return (
                    <LokasjonBadge
                      value={value}
                      index={index}
                      onNavigate={onNavigate}
                      key={index}
                    />
                  );
                })}
            </div>
          </div>
        );
      })*/}
    </div>
  );
};

export default Landskapstype;
