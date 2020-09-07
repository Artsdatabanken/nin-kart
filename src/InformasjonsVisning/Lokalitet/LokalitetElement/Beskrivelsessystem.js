import React from "react";
import språk from "Funksjoner/språk";
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

const sameParent = (array, i) => {
  array = array.map((e) => e[i]);
  for (let n = 1; n < array.length; n++)
    if (array[n].kode !== array[n - 1].kode) return false;
  return true;
};

const group = (variabler) => {
  return variabler.reduce((acc, v) => {
    if (!v.kode) return acc;
    const prefix = v.kode.substring(0, 10);
    acc[prefix] = acc[prefix] || [];
    acc[prefix].push(v);
    return acc;
  }, {});
};
const Beskrivelsessystem = (props) => {
  const { variabler, onNavigate } = props;
  if (!variabler) return null;
  const vars = group(variabler);
  console.log({ vars });
  return (
    <>
      {Object.keys(vars).map((key) => {
        const vari = vars[key].sort((a, b) => (a.kode > b.kode ? 1 : -1));
        console.log({ vari });
        const overordnet = vari[0].overordnet;
        const bs = overordnet[overordnet.length - 4];
        console.log({ forelder: bs });
        return <Blokk bs={bs} variabler={vari} onNavigate={onNavigate} />;
      })}
    </>
  );
};

const Blokk = ({ bs, variabler, onNavigate, ...props }) => {
  return (
    <>
      <Overskrift tittel="Beskrivelsessystem" subtekst="........" />
      <NinCard heading={språk(bs.tittel)} canExpand hasData>
        {(expanded) => (
          <>
            {false && (
              <CardMedia>
                <img src={config.foto(bs.url)} alt="foto" />
              </CardMedia>
            )}
            {variabler.map((type) => {
              const forelder = type.overordnet[0];
              return (
                <Item
                  key={type.kode}
                  secondary={språk(type.tittel)}
                  primary={språk(forelder.tittel)}
                  url={type.url}
                  onClick={onNavigate}
                />
              );
            })}
          </>
        )}
      </NinCard>
    </>
  );
};

/*
 
*/

const Item = ({ primary, secondary, url, onClick }) => (
  <ListItem button onClick={() => onClick(url)}>
    {false && (
      <ListItemAvatar>
        <img src={config.logo(url)} alt="ikon" />
      </ListItemAvatar>
    )}
    <ListItemText primary={primary} secondary={secondary}></ListItemText>
  </ListItem>
);

export default Beskrivelsessystem;
