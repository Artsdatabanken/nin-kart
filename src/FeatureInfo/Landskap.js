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
area: "26220000"
code: "LA-I-A-53"
gml:boundedBy: {gml:Box: {…}}
index: "8707"
name: "Tindepreget ås- og fjellandskap med bart fjell over skoggrensen"
 */
const Landskap = fields => {
  const [open, setOpen] = useState(false);
  if (!fields) return null;
  const grunntype = finnGrunntype(fields);
  if (!grunntype) return null;
  console.log("grunntype", grunntype);
  const { area, code, index, name } = grunntype;
  console.log("grunntype", name);
  if (!name) return null;
  const url =
    "https://artsdatabanken.no/nin/" +
    code.replace("LA-", "LA-TI-").replace(/-/g, "/");
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
          primary={name + " (" + parseInt(area) / 1e6 + " km²)"}
          secondary={"Landskap " + index}
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

function finnGrunntype(fi) {
  let value = null;
  let longestkey = "";
  for (var key of Object.keys(fi)) {
    if (key.indexOf("_layer") < 0) continue;
    if (key.length > longestkey.length) {
      longestkey = key;
      value = fi[key];
    }
  }
  return value && Object.values(value)[0];
}

export default Landskap;
