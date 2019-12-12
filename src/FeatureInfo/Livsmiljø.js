import Landscape from "@material-ui/icons/Landscape";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import {
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import React, { useState } from "react";
import ExpandedHeader from "./ExpandedHeader";

const Livsmiljø = props => {
  if (!props) return null;
  let kartlag = props.barn.find(k => k.kode === props.kode);
  if (!kartlag) kartlag = {};
  return Object.keys(props).map(key => {
    const layer = props[key];
    if (!layer) return null;
    const feature = layer[key.replace("layer", "feature")];
    if (!feature) return null;
    return <Livsmiljo2 {...props} key={key} {...feature} />;
  });
};

const Livsmiljo2 = props => {
  const [open, setOpen] = useState(false);
  const { livsm_beskr, sjikting, vegtype_beskr, topografi } = props;
  if (!livsm_beskr) return null;
  const url = props.url.replace(
    "info_format=application/vnd.ogc.gml",
    "info_format=text/html"
  );
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
          <Landscape />
        </ListItemIcon>
        <ListItemText
          primary={"Livsmiljø: " + livsm_beskr}
          secondary={sjikting + " " + vegtype_beskr + " " + topografi}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <ExpandedHeader
          kode={props.kode}
          visible={props.visible}
          opacity={props.opacity}
          onUpdateLayerProp={props.onUpdateLayerProp}
          geonorge={props.geonorge}
          url={url}
        ></ExpandedHeader>
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
    </div>
  );
};

export default Livsmiljø;
