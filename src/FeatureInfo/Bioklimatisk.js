import { GridOn, ExpandLess, ExpandMore } from "@material-ui/icons";
import {
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import React, { useState } from "react";
import ExpandedHeader from "./ExpandedHeader";

const Bioklimatisk = props => {
  const [open, setOpen] = useState(false);
  if (!props.barn) return null;
  const ban = lookup(props.barn);
  if (!ban) return null;
  const url = "https://artsdatabanken.no/Pages/182001/Regional_naturvariasjon";
  return (
    <div style={{ backgroundColor: open ? "#fff" : "#eeeeee" }}>
      <ListItem
        button
        onClick={() => {
          setOpen(!open);
          //          window.open(url, "", "width=500,height=500")
        }}
      >
        <ListItemIcon>
          <GridOn />
        </ListItemIcon>
        <ListItemText
          primary={ban && ban.tittel && ban.tittel.nb}
          secondary={props.tittel}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <ExpandedHeader
          visible={props.visible}
          opacity={props.opacity}
          onUpdateLayerProp={props.onUpdateLayerProp}
          geonorge={props.geonorge}
          kode={props.kode}
          url={url}
        ></ExpandedHeader>
        <iframe
          allowtransparency="true"
          style={{
            frameBorder: 0,
            width: "100%",
            height: "100vh"
          }}
          title="Faktaark"
          src={url}
        />
      </Collapse>
    </div>
  );
};

function lookup(barn) {
  if (!barn) return null;
  const r = barn.filter(b => b.aktiv);
  if (r.length > 0) return r[0];
  return null;
}

export default Bioklimatisk;
