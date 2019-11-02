import React, { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import { lagGradientRampe } from "Funksjoner/palette/gradientrampe";
import makeUrl from "./KurveFunksjoner/makeUrl";

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
  }, [gradient, punkt]);
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
  const palette = lagGradientRampe(gradient.barn, null, "diskret");

  return React.cloneElement(children, {
    stats: stats,
    gradient: palette,
    kode: gradient.kode
  });
};

export default KurveContainer;
