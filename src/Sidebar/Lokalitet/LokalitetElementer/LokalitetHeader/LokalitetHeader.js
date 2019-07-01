import React from "react";
import { withRouter } from "react-router";
import Kommunevapen from "./Kommunevapen";
import config from "Funksjoner/config";
import flatten from "../../LokalitetFunksjoner/flatten";
import formatElevation from "../../LokalitetFunksjoner/formatElevation";

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
