import React, { useEffect, useState } from "react";
import Kurve from "./Kurve";
import { CircularProgress } from "@material-ui/core";
import lagGradientrampe from "../../palette/gradientrampe";

const KurveContainer = ({ punkt, gradient }) => {
  const [stats, setStats] = useState();
  useEffect(() => {
    const url = `https://romlig.artsdatabanken.no/statistikk/grid1d?punkter=${
      punkt.url
    }&raster=${gradient.url}`;
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
  if (!stats) return <CircularProgress style={{ margin: 24 }} />;
  console.log(gradient);
  const palette = lagGradientrampe(gradient.barn, null, "diskret");

  return <Kurve stats={stats} gradient={palette} />;
};

export default KurveContainer;
