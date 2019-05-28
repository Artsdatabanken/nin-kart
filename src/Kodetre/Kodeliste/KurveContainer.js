import React, { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import lagGradientrampe from "Funksjoner/palette/gradientrampe";

function makeUrl(punkt, gradient) {
  // TODO:
  if (!punkt) return `https://romlig.artsdatabanken.no/${gradient.url}`;
  return `https://romlig.artsdatabanken.no/statistikk/grid1d?punkter=${
    punkt.url
  }&raster=${gradient.url}`;
}
const KurveContainer = ({ punkt, gradient, children }) => {
  const [stats, setStats] = useState();
  useEffect(() => {
    const url = makeUrl(punkt, gradient);
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
  if (stats.feil)
    return (
      <div
        style={{
          padding: 24,
          fontSize: 10,
          color: "red",
          wordWrap: "break-word"
        }}
      >
        {stats.feil.melding}
      </div>
    );
  const palette = lagGradientrampe(gradient.barn, null, "diskret");

  return React.cloneElement(children, {
    stats: stats,
    gradient: palette,
    kode: gradient.kode
  });
};

export default KurveContainer;
