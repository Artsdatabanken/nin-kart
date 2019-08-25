import React from "react";

function roundToX(num, x) {
  return +(Math.round(num + "e+" + x) + "e-" + x);
}

const Stedsinfo = ({ onNavigate, sted, lat, lng, fylke, kommune }) => {
  return (
    <>
      <div className="area_facts">
        {sted && (
          <h1>
            {sted.navn} (<a href={sted.meta.url}>{sted.meta.tittel.nb})</a>
          </h1>
        )}
        {(kommune || fylke) && (
          <h2>
            {kommune}, {fylke}
          </h2>
        )}

        <h3>
          {roundToX(lat, 5)}, {roundToX(lng, 5)}
        </h3>
      </div>
    </>
  );
};

export default Stedsinfo;
