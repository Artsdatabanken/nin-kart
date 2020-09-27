import React from "react";
import språk from "Funksjoner/språk";
import { getKoordinatStreng } from "../koordinater";
import { Place } from "@material-ui/icons";
import { ListItem, ListItemText, ListItemAvatar } from "@material-ui/core";

const getTitle = (sted, kommune) => {
  if (!sted || !sted.dist) return null;
  if (sted.dist > 0.01) {
    console.warn("overdist", { sted });
    return null;
  }
  sted = sted && språk(sted.navn);
  kommune = kommune && språk(kommune.tittel);
  if (!kommune) return sted;
  if (!sted) return kommune;
  return [sted, kommune].join(", ");
};

const Sted = ({ sted, lat, lng, fylke, kommune }) => {
  return (
    <>
      <Item
        primary={getKoordinatStreng([lng, lat])}
        secondary={
          getTitle(sted, kommune) + (fylke && ", " + språk(fylke.tittel))
        }
      />
    </>
  );
};

const Item = ({ primary, secondary, icon, url, onClick }) => (
  <ListItem onClick={() => onClick(url)}>
    <ListItemAvatar>
      <Place style={{ color: "#777" }} />
    </ListItemAvatar>
    <ListItemText primary={primary} secondary={secondary}></ListItemText>
  </ListItem>
);

export default Sted;
