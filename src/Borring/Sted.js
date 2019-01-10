import { Typography } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router";
import Kommunevapen from "./Kommunevapen";

function formatElevation(elevation) {
  if (!elevation) return "";
  if (elevation < 0) return -elevation + " muh";
  return elevation + " moh";
}

const Sted = props => {
  const { kode, sted, tittel2, tittel3, elevasjon } = props;
  const primary = sted ? sted : tittel3;
  const secondary = sted
    ? tittel2 === tittel3
      ? tittel3
      : tittel3 + " i " + tittel2
    : tittel2;
  const color = "rgba(230,230,230,1.0)";
  return (
    <React.Fragment>
      <Typography style={{ color: color }} variant="h6">
        {primary}
      </Typography>
      <Typography style={{ color: color }} variant="body1">
        {secondary}
      </Typography>
      <Typography
        style={{
          float: "right",
          color: color
        }}
        variant="body1"
      >
        {formatElevation(elevasjon)}
      </Typography>
      <div style={{ position: "absolute", left: 334, bottom: 48 }}>
        {kode && <Kommunevapen kode={kode} />}
      </div>
      <Typography
        style={{
          position: "fixed",
          textAlign: "center",
          color: color
        }}
        variant="body2"
      />
    </React.Fragment>
  );
};

export default withRouter(Sted);
