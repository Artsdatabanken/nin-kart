import React, { useEffect, useState } from "react";
import Kurve from "./Kurve";
import { CircularProgress } from "@material-ui/core";

const KurveContainer = ({ punkter, raster }) => {
  const [stats, setStats] = useState();
  useEffect(() => {
    const url = `https://romlig.artsdatabanken.no/statistikk/grid1d?punkter=${punkter}&raster=${raster}`;
    fetch(url)
      .then(result => result.json())
      .then(json => {
        setStats(json);
      })
      .catch(err => {
        console.error(url, err);
        return {};
      });
  }, []);
  if (!stats) return <CircularProgress />;
  return <Kurve stats={stats} />;
};

export default KurveContainer;
