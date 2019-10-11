import React from "react";
import språk from "Funksjoner/språk";
import Bildeavatar from "GjenbruksElement/Bildeavatar";

const Overordnet = ({ overordnet, onNavigate, setExpanded }) => {
  let underordnet = overordnet;
  if (
    underordnet.length > 1 &&
    underordnet[underordnet.length - 1].url === "Natur_i_Norge"
  ) {
    underordnet = underordnet.slice(0, -1);
  }

  const r = underordnet.map((item, i) => (
    <button
      key={item.url}
      onClick={e => {
        setExpanded(false);
        onNavigate(item.url);
      }}
      className="nav_menu_button nav_up_menu"
    >
      <Bildeavatar url={item.url} />
      <div className="nav_text">
        {(item.nivå === "Slekt" ||
          item.nivå === "Art" ||
          item.nivå === "Underart" ||
          item.nivå === "Varietet") && (
          <i>
            <span className="nav_title">
              {språk(item.tittel) === "undefined"
                ? item.tittel.sn
                : språk(item.tittel)}
            </span>
          </i>
        )}

        {item.nivå !== "Slekt" &&
          item.nivå !== "Art" &&
          item.nivå !== "Underart" &&
          item.nivå !== "Varietet" && (
            <span className="nav_title">
              {språk(item.tittel) === "undefined"
                ? item.tittel.sn
                : språk(item.tittel)}
            </span>
          )}

        {/*<span className="nav_2ndtitle">{item.nivå}</span>*/}
      </div>
    </button>
  ));
  r.reverse();
  return r;
};

export default Overordnet;
