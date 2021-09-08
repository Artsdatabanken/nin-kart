import React, { useState } from "react";
import språk from "../../Funksjoner/språk";
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
  const r = items.map((item, i) => {
    let tittel = språk(item.tittel);
    return (
      <ListItem
        key={i}
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
  });
  return r;
};

export default Overordnet;
