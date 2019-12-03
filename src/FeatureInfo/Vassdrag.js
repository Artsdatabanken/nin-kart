import ThreeDRotation from "@material-ui/icons/ThreeDRotation";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import {
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import React, { useState } from "react";

/*
AREAL: "264.33"
GlobalID: "Null"
IKRAFTTREDNINGSDATO: "10/30/1980"
OBJECTID: "156869"
OBJEKTID: "137/1"
OBJEKTNAVN: "Steinselva"
OBJTYPE: "VassVernOmråde"
SUPPLERING: ""
Shape: "Polygon"
VASSDRAGNR: "137.2Z"
VERNEPLAN: "Verneplan II av 1980"
VERNEPLANURL: "sor-trondelag/137-1-Steinselva/"
*/
const Vassdrag = fields => {
  const [open, setOpen] = useState(false);
  if (!fields) return null;
  const { VERNEPLANURL, OBJEKTNAVN, AREAL, OBJEKTID } = fields;
  if (!fields.OBJEKTID) return null;
  const url =
    "https://www.nve.no/vann-vassdrag-og-miljo/verneplan-for-vassdrag/" +
    VERNEPLANURL;
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
          <ThreeDRotation />
        </ListItemIcon>
        <ListItemText
          primary={OBJEKTNAVN + " (" + AREAL + " km²)"}
          secondary={"Verneplan for vassdrag " + OBJEKTID}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <iframe
          style={{ width: "100%", height: "100vh" }}
          title="Faktaark"
          src={url}
        />
      </Collapse>
    </>
  );
};

export default Vassdrag;
