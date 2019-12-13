import { ClearAll, ExpandLess, ExpandMore } from "@material-ui/icons";
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
	<Losmasse_flate_layer>
	<gml:name>Løsmasse flate</gml:name>
		<Losmasse_flate_feature>
			<gml:boundedBy>
				<gml:Box srsName="EPSG:4326">
					<gml:coordinates>10.217928,63.499712 10.694683,63.604319</gml:coordinates>
				</gml:Box>
			</gml:boundedBy>
			<objectid>828045</objectid>
			<objekttype>LosmasseFlate</objekttype>
			<losmassetype>41</losmassetype>
			<losmassetype_tekst>Hav- og fjordavsetning, sammenhengende dekke, ofte med stor mektighet</losmassetype_tekst>
			<losmassetype_definisjon>Finkornige, marine avsetninger med mektighet fra 0,5 m til flere ti-tall meter. Avsetningstypen omfatter også skredmasser fra kvikkleireskred, ofte angitt med tilleggssymbol. Det er få eller ingen fjellblotninger i området.</losmassetype_definisjon>
		</Losmasse_flate_feature>
	</Losmasse_flate_layer>
</msGMLOutput>

losmassetype: "41"
losmassetype_definisjon: "Finkornige, marine avsetninger med mektighet fra 0,5 m til flere ti-tall meter. Avsetningstypen omfatter også skredmasser fra kvikkleireskred, ofte angitt med tilleggssymbol. Det er få eller ingen fjellblotninger i området."
losmassetype_tekst: "Hav- og fjordavsetning, sammenhengende dekke, ofte med stor mektighet"
objectid: "828158"
objekttype: "LosmasseFlate"
*/
const Løsmasse = props => {
  const [open, setOpen] = useState(false);
  if (!props) return null;
  const layer = props.Losmasse_flate_layer;
  if (!layer) return null;
  const feature = layer.Losmasse_flate_feature;
  if (!feature) return null;
  const { losmassetype_tekst, objectid } = feature;
  if (!losmassetype_tekst) return null;
  let url = props.url.replace(
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
          <ClearAll />
        </ListItemIcon>
        <ListItemText
          primary={losmassetype_tekst}
          secondary={"Løsmasse " + objectid}
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

export default Løsmasse;
