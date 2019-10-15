import React from "react";
import språk from "Funksjoner/språk";
import isItalics from "Funksjoner/isItalics";
import Bildeavatar from "GjenbruksElement/Bildeavatar";

const Overordnet = ({ overordnet, onNavigate, setExpanded }) => {
  let underordnet = overordnet;
  if (
    underordnet.length > 1 &&
    underordnet[underordnet.length - 1].url === "Natur_i_Norge"
  ) {
    underordnet = underordnet.slice(0, -1);
  }

  const r = underordnet.map((item, i) => {
    let tittel = språk(item.tittel);
    let sn = "";
    if (
      språk(item.tittel) === "undefined" ||
      item.tittel["sn"] === item.tittel ||
      item.tittel["sn"] === tittel
    ) {
      sn = "sn";
    }
    return (
      <button
        key={item.url}
        onClick={e => {
          setExpanded(false);
          onNavigate(item.url);
        }}
        className="nav_menu_button nav_up_menu"
      >
        <Bildeavatar url={item.url} />
        <div
          className={
            isItalics(item["nivå"] || null, sn)
              ? "italics nav_text"
              : "nav_text"
          }
        >
          <span className="nav_title">{tittel}</span>
        </div>
      </button>
    );
  });
  r.reverse();
  return r;
};

export default Overordnet;
