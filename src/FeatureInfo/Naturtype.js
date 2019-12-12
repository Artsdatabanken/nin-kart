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
/*
 */

const Naturtype = props => {
  const [open, setOpen] = useState(false);
  if (!props) return null;
  const { NiNID, Naturtype, NiNKartleggingsenheter } = props;
  if (!Naturtype) return null;
  let url = "https://nin-faktaark.miljodirektoratet.no/naturtyper/?id=" + NiNID; //NINFP1810030453";
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
          primary={Naturtype}
          secondary={"Naturtype (" + NiNKartleggingsenheter + ")"}
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
        ></ExpandedHeader>
        <ul>
          <li style={{ padding: 16 }}>
            <a href={url} target="_top">
              Faktaark i eget vindu
            </a>
          </li>
        </ul>
        {false && (
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
        )}
      </Collapse>
    </>
  );
};

export default Naturtype;
