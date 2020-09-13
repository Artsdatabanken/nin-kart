import React from "react";
import språk from "Funksjoner/språk";
import Overskrift from "../../Overskrift";
import NinCard from "../../NinCard";
import {
  CardMedia,
  Collapse,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@material-ui/core";
import config from "../../../Funksjoner/config";

const sameParent = (array, i) => {
  array = array.map((e) => e[i]);
  for (let n = 1; n < array.length; n++) {
    const current = array[n];
    const previous = array[n - 1];
    if (!current || !previous) return false;
    if (current.kode !== previous.kode) return false;
  }
  return true;
};

const finnFellesOverordnet = (typer) => {
  if (!typer) return null;
  if (typer.length === 0) return null;
  if (typer.length === 1) return typer[0].overordnet[0];
  const oos = typer.map((e) => e.overordnet.reverse());
  let max = Math.max(...oos.map((e) => e.length));
  for (let i = 1; i < max; i++) {
    if (!sameParent(oos, i)) return oos[0][i - 1];
  }
  return oos[0].pop();
};

const Naturtype = (props) => {
  const { type: typer, onNavigate } = props;
  if (!typer) return null;
  const forelder = finnFellesOverordnet(typer);
  const { tittel, nivå } = forelder;
  if (!forelder) return null;
  return (
    <>
      <Overskrift tittel="Naturtype" subtekst="........" />
      <NinCard heading={språk(tittel) + " (" + nivå + ")"} canExpand hasData>
        {(expanded) => (
          <>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardMedia>
                {<img src={config.foto(forelder.url)} alt="foto" />}
              </CardMedia>
              {typer.map((type) => (
                <Item
                  key={type.kode}
                  primary={språk(type.tittel)}
                  url={type.url}
                  målestokk={type.kart && "(1:" + type.kart.målestokk + ")"}
                  onClick={onNavigate}
                />
              ))}
            </Collapse>
          </>
        )}
      </NinCard>
    </>
  );
};

const Item = ({ primary, secondary, målestokk, url, onClick }) => (
  <ListItem button onClick={() => onClick(url)}>
    <ListItemAvatar>
      <img src={config.logo(url)} alt="ikon" />
    </ListItemAvatar>
    <ListItemText
      primary={primary + " " + målestokk}
      secondary={secondary}
    ></ListItemText>
  </ListItem>
);

export default Naturtype;
