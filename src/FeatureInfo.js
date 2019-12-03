import LocationSearching from "@material-ui/icons/LocationSearching";
import PregnantWoman from "@material-ui/icons/PregnantWoman";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import Close from "@material-ui/icons/Close";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Collapse,
  List,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from "@material-ui/core";

const FeatureInfo = ({ lat, lng, sted, vassdrag }) => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div
      style={{
        backgroundColor: "#eee",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
        position: "absolute",
        zIndex: -1,
        right: 0,
        width: 408,
        top: 36,
        bottom: 0
      }}
    >
      <List>
        <IconButton
          style={{ float: "right", right: 16 }}
          onClick={() => setVisible(!visible)}
        >
          <Close />
        </IconButton>
        <ListSubheader>Overskrift</ListSubheader>
        {lat && (
          <ListItem button>
            <ListItemIcon>
              <LocationSearching />
            </ListItemIcon>
            <ListItemText
              primary={sted && sted.navn}
              secondary={`${Math.round(lat * 10000) / 10000}° N ${Math.round(
                lng * 10000
              ) / 10000}° Ø`}
            />
          </ListItem>
        )}
        <Ferskvann {...vassdrag} />
      </List>
    </div>
  );
};

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
const Ferskvann = fields => {
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
          <PregnantWoman />
        </ListItemIcon>
        <ListItemText
          primary={OBJEKTNAVN + " (" + AREAL + " km²)"}
          secondary={"Verneplan for vassdrag " + OBJEKTID}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <iframe
          style={{ width: "100%", height: 400 }}
          title="Faktaark"
          src={url}
        />
      </Collapse>
    </>
  );
};

export default withRouter(FeatureInfo);
