import React, { useState } from "react";
import { ChevronRight, Home, ChevronLeft } from "@material-ui/icons";
import språk from "../Funksjoner/språk";

const Breadcrumbs = ({ isstartpage, onNavigate, meta }) => {
  const [showCrumbs, setShowCrumbs] = useState(false);
  if (isstartpage) return null;
  if (!meta) return null;
  const breadcrumbs = meta.overordnet;

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
        {breadcrumbs.length - 1 > 0 && !showCrumbs && (
          <li>
            <ChevronRight />
            <button
              onClick={() => {
                setShowCrumbs(!showCrumbs);
              }}
            >
              ...
            </button>
          </li>
        )}
        {breadcrumbs.map((el, i) => {
          let hiddenclass = "";
          if (i < breadcrumbs.length - 1) {
            hiddenclass = "hiddencrumbs";
          }
          return (
            <li className={showCrumbs ? "active" : hiddenclass} key={i}>
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
        {false && breadcrumbs.length - 1 > 0 && showCrumbs && (
          <li>
            <button
              onClick={() => {
                setShowCrumbs(!showCrumbs);
              }}
            >
              <ChevronLeft />
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
