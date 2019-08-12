import React from "react";
import språk from "Funksjoner/språk";
import Bildeavatar from "GjenbruksElement/Bildeavatar";

const Overordnet = ({ overordnet, onNavigate }) => {
  let underordnet = overordnet;
  if (underordnet[underordnet.length - 1].url === "Katalog") {
    underordnet = underordnet.slice(0, -1);
  }

  if (
    underordnet[underordnet.length - 1] &&
    underordnet[underordnet.length - 1].url === "Natur_i_Norge"
  ) {
    underordnet = underordnet.slice(0, -1);
  }

  const r = underordnet.map((item, i) => (
    <button
      key={item.url}
      onClick={e => {
        e.stopPropagation();
        onNavigate(item.url);
      }}
      className="nav_menu_button nav_up_menu"
    >
      <Bildeavatar url={item.url} />
      <div className="nav_text">
        <span className="nav_title">{språk(item.tittel)}</span>
        {/*<span className="nav_2ndtitle">{item.nivå}</span>*/}
      </div>
    </button>
  ));
  r.reverse();
  return r;
};

export default Overordnet;
