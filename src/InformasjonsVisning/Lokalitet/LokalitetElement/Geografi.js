import React from "react";
import språk from "Funksjoner/språk";
import { getKoordinatStreng } from "../../../koordinater";
import Overskrift from "../../Overskrift";
import NinCard from "../../NinCard";
import {
  CardMedia,
  Collapse,
  CardContent,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
} from "@material-ui/core";
import config from "../../../Funksjoner/config";

const Geografi = ({ sted, lat, lng, fylke, kommune, onNavigate }) => {
  if (lat.includes("?")) {
    lat = lat.substring(0, lat.indexOf("?"));
  }
  console.log({ kommune });
  return (
    <div className="area_facts">
      <Overskrift tittel="Geografi" subtekst="........" />
      <NinCard heading="Geografi" canExpand>
        {kommune && kommune.bilde.foto.url && (
          <CardMedia>
            <img src={kommune.bilde.foto.url} alt="foto" />
          </CardMedia>
        )}
        <CardContent>
          <Typography variant="body2">
            {getKoordinatStreng([lng, lat])}
          </Typography>
        </CardContent>
        <Collapse in={true} timeout="auto" unmountOnExit>
          {sted && (
            <Item
              primary={språk(sted.navn)}
              secondary={sted.meta.tittel.nb}
              url={sted.meta.url}
              onClick={onNavigate}
            />
          )}
          {kommune && (
            <Item
              primary={språk(kommune.tittel)}
              secondary="Kommune"
              url={kommune.url}
              onClick={onNavigate}
            />
          )}
          {fylke && (
            <Item
              primary={språk(fylke.tittel)}
              secondary="Fylke"
              url={fylke.url}
              onClick={onNavigate}
            />
          )}
        </Collapse>
      </NinCard>
    </div>
  );
};

const Item = ({ primary, secondary, url, onClick }) => (
  <ListItem button onClick={() => onClick(url)}>
    <ListItemAvatar>
      <img src={config.logo(url)} />
    </ListItemAvatar>
    <ListItemText primary={primary} secondary={secondary}></ListItemText>
  </ListItem>
);

export default Geografi;
