import React from "react";

const Stedsinfo = ({ onNavigate, sted, lat, lng, fylke, kommune }) => {
  return (
    <>
      <div className="area_facts">
        <h1>{sted}</h1>
        <h2 />
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
