import React from "react";
import språk from "Funksjoner/språk";
import { getKoordinatStreng } from "../../../koordinater";

const Stedsinfo = ({ sted, lat, lng, fylke, kommune }) => {
  if (lat.includes("?")) {
    lat = lat.substring(0, lat.indexOf("?"));
  }
  return (
    <div className="area_facts">
      {sted && (
        <h1>
          {sted.navn}{" "}
          {sted.meta && <a href={sted.meta.url}>{språk(sted.meta.tittel)})</a>}
        </h1>
      )}
      {(kommune || fylke) && (
        <h2>
          {kommune}, {fylke}
        </h2>
      )}

      <h3>{getKoordinatStreng([lng, lat])}</h3>
    </div>
  );
};

export default Stedsinfo;
