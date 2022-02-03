import React from "react";
import språk from "../../../Funksjoner/språk";
import { getKoordinatStreng } from "../../../koordinater";
import Overskrift from "../../Overskrift";
import NinCard from "../../NinCard";

import SectionExpand from "../../../GjenbruksElement/SectionExpand";
import { getParentUrl } from "../../../AppSettings/AppFunksjoner/fetchMeta";

import {
  CardMedia,
  Collapse,
  CardContent,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography
} from "@material-ui/core";
import config from "../../../Funksjoner/config";

const getSted = sted => {
  if (!sted || !sted.meta) return null;
  return språk(sted.meta.tittel);
};

const getOverordnet = sted => {
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
    <div className="section">
      <Overskrift
        tittel="Sted"
        image="Administrativ_grense/Territorialområde/Sjøterritorium_og_territorialfarvann/Fastlands-Norge"
      />

      <div className="subsection">
        <h4>Stedsnavn</h4>

        <SectionExpand title={getTitle(sted, kommune)}>
          {true && sted1 && sted2 && (
            <Item
              primary={sted1 + ", " + sted2}
              secondary={"Stedsnavn"}
              parenturl={getParentUrl(sted)}
              url={sted.meta.url}
              onClick={onNavigate}
            />
          )}
          {false &&
            kommune &&
            kommune.bilde &&
            kommune.bilde.foto &&
            kommune.bilde.foto.url && (
              <CardMedia>
                <img src={kommune.bilde.foto.url} alt="foto av kommunen." />
              </CardMedia>
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

          {verneområde && (
            <Item
              primary={språk(verneområde.tittel)}
              secondary={språk(verneområde.overordnet[0].tittel)}
              parenturl={getParentUrl(verneområde)}
              url={verneområde.url}
              onClick={onNavigate}
            />
          )}
        </SectionExpand>
      </div>
    </div>
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
