import React from "react";
import språk from "../../../Funksjoner/språk";
import { getKoordinatStreng } from "../../../koordinater";
import Overskrift from "../../Overskrift";
import NinCard from "../../NinCard";
import { getParentUrl } from "../../../AppSettings/AppFunksjoner/fetchMeta";

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

const Sted = ({ sted, lat, lng, fylke, kommune, verneområde, onNavigate }) => {
  const sted2 = getSted(sted);
  const sted1 = getOverordnet(sted);
  return (
    <>
      <Overskrift
        tittel="Sted"
        image="Administrativ_grense/Territorialområde/Sjøterritorium_og_territorialfarvann/Fastlands-Norge"
      />
      <NinCard
        image="Administrativ_grense/Territorialområde/Sjøterritorium_og_territorialfarvann/Fastlands-Norge"
        heading="Sted"
        title={getTitle(sted, kommune)}
        canExpand
        hasData={!!sted}
      >
        {(expanded) => (
          <>
            {false &&
              kommune &&
              kommune.bilde &&
              kommune.bilde.foto &&
              kommune.bilde.foto.url && (
                <CardMedia>
                  <img src={kommune.bilde.foto.url} alt="foto" />
                </CardMedia>
              )}
            <CardContent>
              <Typography variant="body2">
                Posisjon: {getKoordinatStreng([lat, lng])}
              </Typography>
            </CardContent>
            {false && sted1 && sted2 && (
              <Item
                primary={sted1 + ", " + sted2}
                secondary={"Stedsnavn"}
                parenturl={getParentUrl(sted)}
                url={sted.meta.url}
                onClick={onNavigate}
              />
            )}
            {verneområde && (
              <Item
                primary={språk(verneområde.tittel)}
                secondary={språk(verneområde.overordnet[0].tittel)}
                parenturl={getParentUrl(verneområde)}
                url={verneområde.url}
                onClick={onNavigate}
              />
            )}

            {kommune && (
              <Item
                primary={språk(kommune.tittel)}
                secondary="Kommune"
                parenturl={getParentUrl(kommune)}
                url={kommune.url}
                onClick={onNavigate}
              />
            )}
            {fylke && (
              <Item
                primary={språk(fylke.tittel)}
                secondary="Fylke"
                parenturl={getParentUrl(fylke)}
                url={fylke.url}
                onClick={onNavigate}
              />
            )}
            <Collapse in={expanded} timeout="auto" unmountOnExit></Collapse>
          </>
        )}
      </NinCard>
    </>
  );
};

const Item = ({ primary, secondary, parenturl, url, onClick }) => (
  <ListItem button onClick={() => onClick(parenturl)}>
    <ListItemAvatar>
      <img src={config.logo(url)} alt="" />
    </ListItemAvatar>
    <ListItemText primary={primary} secondary={secondary}></ListItemText>
  </ListItem>
);

export default Sted;
