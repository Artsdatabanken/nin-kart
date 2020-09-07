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

const getSted = (sted) => {
  if (!sted.meta) return null;
  const tittel = språk(sted.meta.tittel);
  if (!sted.meta.overordnet || sted.meta.overordnet.length <= 0) return tittel;
  return språk(sted.meta.overordnet[0].tittel) + ": " + tittel;
};

const Geografi = ({ sted, lat, lng, fylke, kommune, onNavigate }) => {
  return (
    <div>
      <Overskrift tittel="Geografi" />
      <NinCard heading="Geografi" canExpand hasData={!!sted}>
        {kommune &&
          kommune.bilde &&
          kommune.bilde.foto &&
          kommune.bilde.foto.url && (
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
          {sted && sted.navn !== "undefined" && (
            <Item
              primary={språk(sted.navn)}
              secondary={getSted(sted)}
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
      <img src={config.logo(url)} alt="ikon" />
    </ListItemAvatar>
    <ListItemText primary={primary} secondary={secondary}></ListItemText>
  </ListItem>
);

export default Geografi;
