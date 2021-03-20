import React from "react";
import språk from "Funksjoner/språk";
import isItalics from "Funksjoner/isItalics";
import Bildeavatar from "GjenbruksElement/Bildeavatar";

const Overordnet = ({ overordnet, onNavigate, setExpanded }) => {
  const root = { tittel: { nb: "Startside" }, url: "/" };
  var items = [...overordnet, root];
  items.reverse();

  const r = items.map((item) => {
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
        onClick={(e) => {
          setExpanded(false);
          onNavigate(item.url);
        }}
        className="nav_menu_button nav_up_menu"
      >
        {false && <Bildeavatar url={item.url} />}
        <div
          className={
            isItalics(item["nivå"] || null, sn)
              ? "italics nav_text"
              : "nav_text"
          }
        >
          <span className="nav_title">{"▾ " + tittel}</span>
        </div>
      </button>
    );
  });
  return r;
};

export default Overordnet;
