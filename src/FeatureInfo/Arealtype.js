import { LocationCity, ExpandLess, ExpandMore } from "@material-ui/icons";
import {
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import React, { useState } from "react";
import ExpandedHeader from "./ExpandedHeader";
/*
<msGMLOutput 
	 xmlns:gml="http://www.opengis.net/gml"
	 xmlns:xlink="http://www.w3.org/1999/xlink"
	 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
	<Arealtyper_layer>
	<gml:name>Arealtyper</gml:name>
		<Arealtyper_feature>
			<gml:boundedBy>
				<gml:Box srsName="EPSG:4326">
					<gml:coordinates>10.556298,63.402536 10.614902,63.429819</gml:coordinates>
				</gml:Box>
			</gml:boundedBy>
			<areal>1957270.15718</areal>
			<ar50klasse_beskrivelse>Barskog, middels skogbonitet</ar50klasse_beskrivelse>
			<artype>30</artype>
			<artreslag>31</artreslag>
			<arskogbon>13</arskogbon>
			<ardyrking>81</ardyrking>
			<arjordbr>98</arjordbr>
			<arveget>98</arveget>
			<artype_beskrivelse>Skog</artype_beskrivelse>
			<artreslag_beskrivelse>Barskog</artreslag_beskrivelse>
			<arskogbon_beskrivelse>Middels bonitet</arskogbon_beskrivelse>
			<ardyrking_beskrivelse>Ikke dyrkbar jord</ardyrking_beskrivelse>
			<arjordbr_beskrivelse>Ikke relevant</arjordbr_beskrivelse>
			<arveget_beskrivelse>Ikke relevant</arveget_beskrivelse>
			<bonitet>4</bonitet>
			<bonitet_beskrivelse>Skog, middels bonitet</bonitet_beskrivelse>
			<sl_sdeid>1191183</sl_sdeid>
		</Arealtyper_feature>
	</Arealtyper_layer>
</msGMLOutput>  
*/
const Arealtype = props => {
  //  console.log("grunntype", props);
  const [open, setOpen] = useState(false);
  if (!props) return null;
  const layer = props.Arealtyper_layer;
  if (!layer) return null;
  const feature = layer.Arealtyper_feature;
  if (!feature) return null;
  const { areal, artype, artype_beskrivelse } = feature;
  if (!artype_beskrivelse) return null;
  let kartlag = props.barn.find(k => k.kode === props.kode);
  if (!kartlag) kartlag = {};

  let url =
    "https://www.nibio.no/tema/jord/arealressurser/arealressurskart-ar5/" +
    artype_beskrivelse.toLowerCase();
  url = props.url.replace(
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
          <LocationCity />
        </ListItemIcon>
        <ListItemText
          primary={
            artype_beskrivelse + " (" + round(parseInt(areal) / 1e6) + " km²)"
          }
          secondary={"AR5 Arealtype " + artype}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <ExpandedHeader
          visible={props.visible}
          onUpdateLayerProp={props.onUpdateLayerProp}
          geonorge={props.geonorge}
          kode={props.kode}
          erSynlig={kartlag.erSynlig}
          opacity={kartlag.opacity}
          url={url}
        ></ExpandedHeader>
        <iframe
          style={{
            width: "100%",
            height: "100vh",
            transform: "scale(1.5)",
            transformOrigin: "0 0"
          }}
          title="Faktaark"
          src={url}
        />
      </Collapse>
    </div>
  );
};

function round(v) {
  return Math.round(v * 100) / 100;
}

export default Arealtype;
