import { Typography } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router";
import Kommunevapen from "./Kommunevapen";
import config from "../config";

function formatElevation(elevation) {
  if (!elevation) return "";
  if (elevation < 0) return -elevation + " muh";
  return elevation + " moh";
}

function flatten(values) {
  const fn = Object.values(values)[0];
  const kn = Object.values(fn.values)[0];
  return { fylke: fn.title, kommune: kn.title };
}

const Sted = props => {
  const { sted, values, elevasjon } = props;
  if (!values) return null; // Har du klikket i havet?
  const { fylke, kommune } = flatten(values);
  const url = `/Fylke/${config.hackUrl(fylke)}/${config.hackUrl(kommune)}`;
  const primary = sted ? sted : fylke;
  const secondary = sted
    ? kommune === fylke
      ? fylke
      : kommune + " i " + fylke
    : kommune;
  const color = "rgba(230,230,230,1.0)";
  return (
    <>
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
        {url && <Kommunevapen url={url} />}
      </div>
      <Typography
        style={{
          position: "fixed",
          textAlign: "center",
          color: color
        }}
        variant="body2"
      />
    </>
  );
};

export default withRouter(Sted);
