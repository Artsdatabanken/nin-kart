import React from "react";
import tekst from "./katalogStatistikkFunjsoner";
import { PieChart } from "@material-ui/icons/";

const Statistikk = ({ prefiks, overordnet, stats, tittel, arealPrefix }) => {
  if (!stats.areal) return null;
  const arter = stats.arter + " ulike arter";
  const areal = stats.areal;
  const prosent = ((100 * stats.areal) / arealPrefix).toFixed(1) + " %";
  return (
    <p className="stats_paragraph">
      <PieChart />
      {tekst({
        tittel: tittel,
        overordnet: overordnet,
        prefiks: prefiks,
        areal,
        arter,
        prosent
      })}
    </p>
  );
};

export default Statistikk;
