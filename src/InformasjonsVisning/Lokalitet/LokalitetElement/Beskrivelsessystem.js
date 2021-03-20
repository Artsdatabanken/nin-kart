import React from "react";
import språk from "Funksjoner/språk";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListSubheader,
} from "@material-ui/core";
import config from "../../../Funksjoner/config";
import { getParentUrl } from "../../../AppSettings/AppFunksjoner/fetchMeta";

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
            url={getParentUrl(type)}
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
        {true && <img src={config.logo(url)} alt="" />}
      </ListItemAvatar>
    }
    <ListItemText primary={primary} secondary={secondary}></ListItemText>
  </ListItem>
);

export default Beskrivelsessystem;
