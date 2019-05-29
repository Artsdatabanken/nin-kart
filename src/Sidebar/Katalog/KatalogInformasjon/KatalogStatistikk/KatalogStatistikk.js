import React from "react";
import tekst from "./katalogStatistikkFunjsoner";

const Statistikk = ({ prefiks, overordnet, stats, tittel, arealPrefix }) => {
  if (!stats.areal) return null;
  const arter = stats.arter + " ulike arter";
  const areal = stats.areal;
  const prosent = ((100 * stats.areal) / arealPrefix).toFixed(1) + " %";
  return (
    <div className="sidebar_element">
      <p>
        {tekst({
          tittel: tittel,
          overordnet: overordnet,
          prefiks: prefiks,
          areal,
          arter,
          prosent
        })}
      </p>
    </div>
  );
};

export default Statistikk;
