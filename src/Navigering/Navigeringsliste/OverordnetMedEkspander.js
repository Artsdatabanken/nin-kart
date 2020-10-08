import React, { useState } from "react";
import språk from "Funksjoner/språk";
import isItalics from "Funksjoner/isItalics";
import Bildeavatar from "GjenbruksElement/Bildeavatar";
import { ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import { AccountTree } from "@material-ui/icons";

const Overordnet = ({ overordnet, onNavigate, setExpanded }) => {
  const [expand, setExpand] = useState(false);
  const root = { tittel: { nb: "Startside" }, url: "/" };
  var items = [...overordnet, root];
  items.reverse();

  if (!expand && items.length > 2) {
    return (
      <ListItem button onClick={() => setExpand(true)}>
        <ListItemAvatar>
          <AccountTree style={{ color: "#777" }} />
        </ListItemAvatar>
        <ListItemText
          primary={items
            .slice(1, items.length)
            .map((item) => item.tittel.nb)
            .join(" ➝ ")}
        ></ListItemText>
      </ListItem>
    );
  }
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
      <ListItem
        button
        onClick={(e) => {
          setExpanded(false);
          onNavigate(item.url);
        }}
      >
        {false && (
          <ListItemAvatar>
            <AccountTree />
          </ListItemAvatar>
        )}
        <ListItemText primary={tittel} _secondary={item.nivå}></ListItemText>
      </ListItem>
    );
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
