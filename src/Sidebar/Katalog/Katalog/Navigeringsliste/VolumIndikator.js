import { withTheme } from "@material-ui/core/styles";

import React from "react";
const VolumIndikator = ({ areal, størsteAreal, theme }) => {
  if (!areal) areal = 0;
  if (!størsteAreal) størsteAreal = 1;
  return (
    <div
      style={{
        transition: "width 0.5s ease-out",
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: `${(80.0 * areal) / størsteAreal}%`,
        backgroundColor: "#eee",
        zIndex: -1
      }}
    />
  );
};
export default withTheme(VolumIndikator);
