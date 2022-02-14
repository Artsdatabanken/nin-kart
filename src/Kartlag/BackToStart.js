import React from "react";
import { ChevronRight, Home } from "@material-ui/icons";
import MainSectionExpand from "../GjenbruksElement/MainSectionExpand";
import BackButton from "./Buttons/BackButton";
import getTitle from "../Funksjoner/getTitle";
import språk from "../Funksjoner/språk";

const BackToStart = ({ isstartpage, onNavigate, meta }) => {
  if (isstartpage) return null;
  if (!meta) return null;
  let backurl = "/start";
  if (meta.overordnet !== undefined && meta.overordnet[0] !== undefined) {
    backurl = meta.overordnet[0].url;
  }
  return (
    <div className="section">
      <ul className="breadcrumbs">
        <li>
          <button
            className="breadcrumb"
            onClick={() => {
              onNavigate("/kart");
            }}
          >
            <Home />
          </button>
        </li>
        {meta.overordnet.reverse().map(el => {
          return (
            <li>
              <ChevronRight />
              <button
                className="breadcrumb"
                onClick={() => {
                  onNavigate(el.url);
                }}
              >
                {språk(el.tittel)}
              </button>
            </li>
          );
        })}
        <li>
          <ChevronRight />
          <span className="breadcrumb currentelement">Nåværende kartlag</span>
        </li>
      </ul>
    </div>
  );
};

export default BackToStart;
