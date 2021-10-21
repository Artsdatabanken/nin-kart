import React from "react";
import språk from "../../../Funksjoner/språk";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListSubheader,
} from "@material-ui/core";
import config from "../../../Funksjoner/config";
import { getParentUrl } from "../../../AppSettings/AppFunksjoner/fetchMeta";

const group = (ulkm) => {
  return Object.keys(ulkm).reduce((acc, prefix) => {
    if (prefix === "undefined") return acc; // koder vi mangler
    var items = Object.values(ulkm[prefix]);
    // let items = ulkm[prefix];
    // items = items.filter((e) => !!e.overordnet);
    if (items.length > 0) acc[prefix] = items;
    return acc;
  }, {});
};

const Ulkm = (props) => {
  const { ulkm, onNavigate } = props;
  if (!ulkm) return null;
  // const ulkms = group(ulkm);
  return (
    <>
      <ListSubheader>{språk('uLKM')}</ListSubheader>
      {Object.keys(ulkm).map((key) => {
        // const vari = ulkm[key].sort((a, b) => (a.ulkmkode > b.ulkmkode ? 1 : -1));
        // const overordnet = vari[0].overordnet;
        // const bs = overordnet[overordnet.length - 4];
        return (
          <Blokk key={key} ulkm={ulkm[key].ulkmkode} variabler={ulkm[key]} onNavigate={onNavigate} />
        );
      })}
    </>
  );
};

const Blokk = ({ ulkm, variabler, onNavigate, ...props }) => {
  let url = '/Natur_i_Norge/Natursystem/Miljøvariabler/';
  url += variabler.gradientkodebeskrivelse.replace(/ /g, '_');
  return (
    <>
      <Item
        key={variabler.ulkmkode}
        primary={språk(variabler.gradientkodebeskrivelse)}
        secondary={språk(variabler.trinnbeskrivelse)}
        url={url}
        onClick={onNavigate}
      />
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

export default Ulkm;
