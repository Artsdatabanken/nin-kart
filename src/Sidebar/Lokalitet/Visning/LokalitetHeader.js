import React from "react";
import { withRouter } from "react-router";
import Kommunevapen from "./Kommunevapen";
import config from "Funksjoner/config";

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
  return (
    <>
      <div className="title_container_location">
        <h1 className="sidebar_title">{primary}</h1>
        <h2>{secondary}</h2>
      </div>
      <div className="shield_container">
        <div>{url && <Kommunevapen url={url} />}</div>
        <p>{formatElevation(elevasjon)}</p>
      </div>
    </>
  );
};

export default withRouter(Sted);
