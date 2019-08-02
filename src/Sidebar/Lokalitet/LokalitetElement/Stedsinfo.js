import React from "react";

const Stedsinfo = ({ onNavigate, data, lat, lng, fylke, kommune }) => {
  return (
    <>
      <div className="area_facts">
        <h1>{data.sted.navn}</h1>
        <h2>
          {data.sted.kategori[0]}, {data.sted.kategori[1]},{" "}
          {data.sted.kategori[2]}
        </h2>
        <h2>
          {kommune}, {fylke}
        </h2>
        <h3>
          {lat}, {lng}
        </h3>
      </div>
    </>
  );
};

export default Stedsinfo;
