import React from "react";
import { ChevronRight, Home } from "@material-ui/icons";
import språk from "../Funksjoner/språk";

const BackToStart = ({ isstartpage, onNavigate, meta }) => {
  if (isstartpage) return null;
  if (!meta) return null;

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
