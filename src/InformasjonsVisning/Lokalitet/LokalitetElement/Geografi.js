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
  if (!sted || !sted.meta) return null;
  return språk(sted.meta.tittel);
};

const getOverordnet = (sted) => {
  if (
    !sted ||
    !sted.meta ||
    !sted.meta.overordnet ||
    sted.meta.overordnet.length <= 0
  )
    return null;
  return språk(sted.meta.overordnet[0].tittel);
};

const getTitle = (sted, kommune) => {
  if (!sted || !sted.dist) return null;
  if (sted.dist > 0.01) {
    console.warn("overdist", { sted });
    return null;
  }
  sted = sted && språk(sted.navn);
  kommune = kommune && språk(kommune.tittel);
  if (!kommune) return sted;
  if (!sted) return kommune;
  return [sted, kommune].join(", ");
};

const Geografi = ({ sted, lat, lng, fylke, kommune, onNavigate }) => {
  const sted2 = getSted(sted);
  const sted1 = getOverordnet(sted);
  return (
    <>
      <Overskrift tittel="Geografi" />
      <NinCard
        title={getTitle(sted, kommune)}
        heading="Geografi"
        canExpand
        hasData={!!sted}
      >
        {(expanded) => (
          <>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
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
                  Poisjon: {getKoordinatStreng([lng, lat])}
                </Typography>
              </CardContent>
              {sted1 && sted2 && (
                <Item
                  primary={sted1 + ", " + sted2}
                  secondary={"Stedsnavn"}
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
          </>
        )}
      </NinCard>
    </>
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
