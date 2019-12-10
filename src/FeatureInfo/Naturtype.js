import Landscape from "@material-ui/icons/Landscape";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import {
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import React, { useState } from "react";

/*
 */

const Naturtype = props => {
  const [open, setOpen] = useState(false);
  if (!props) return null;
  //  console.error("############### na", props);
  const layer = props.Losmasse_flate_layer;
  if (!layer) return null;
  const feature = layer.Losmasse_flate_feature;
  if (!feature) return null;
  const {
    losmassetype,
    losmassetype_definisjon,
    losmassetype_tekst,
    objectid,
    objekttype
  } = feature;
  if (!losmassetype_tekst) return null;
  let url =
    "https://www.nibio.no/tema/jord/arealressurser/arealressurskart-ar5/";
  url = props.url.replace(
    "info_format=application/vnd.ogc.gml",
    "info_format=text/html"
  );
  return (
    <>
      <ListItem
        button
        onClick={() => {
          setOpen(!open);
          //          window.open(url, "", "width=500,height=500")
        }}
      >
        <ListItemIcon>
          <Landscape />
        </ListItemIcon>
        <ListItemText
          primary={losmassetype_tekst}
          secondary={"Løsmasse " + objectid}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <iframe
          style={{
            width: "100%",
            height: "100vh",
            transform: "scale(0.9)",
            transformOrigin: "0 0"
          }}
          title="Faktaark"
          src={url}
        />
      </Collapse>
    </>
  );
};

export default Naturtype;
