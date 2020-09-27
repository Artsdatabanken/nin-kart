import React from "react";
import språk from "Funksjoner/språk";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListSubheader,
} from "@material-ui/core";
import config from "../../../Funksjoner/config";

const group = (variabler) => {
  return Object.keys(variabler).reduce((acc, prefix) => {
    if (prefix === "undefined") return acc; // koder vi mangler
    var items = Object.values(variabler[prefix]);
    items = items.filter((e) => !!e.overordnet);
    if (items.length > 0) acc[prefix] = items;
    return acc;
  }, {});
};

const Beskrivelsessystem = (props) => {
  const { variabler, onNavigate } = props;
  if (!variabler) return null;
  const vars = group(variabler);
  console.log("-----------", Object.keys(vars).length);
  return (
    <>
      {Object.keys(vars).map((key) => {
        const vari = vars[key].sort((a, b) => (a.kode > b.kode ? 1 : -1));
        const overordnet = vari[0].overordnet;
        const bs = overordnet[overordnet.length - 4];
        return (
          <Blokk key={key} bs={bs} variabler={vari} onNavigate={onNavigate} />
        );
      })}
    </>
  );
};

const Blokk = ({ bs, variabler, onNavigate, ...props }) => {
  return (
    <>
      <ListSubheader>{språk(bs.tittel)}</ListSubheader>
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
  );
};

const Item = ({ primary, secondary, url, onClick }) => (
  <ListItem button onClick={() => onClick(url)}>
    {
      <ListItemAvatar>
        {true && <img src={config.logo(url)} alt="ikon" />}
      </ListItemAvatar>
    }
    <ListItemText primary={primary} secondary={secondary}></ListItemText>
  </ListItem>
);

export default Beskrivelsessystem;
