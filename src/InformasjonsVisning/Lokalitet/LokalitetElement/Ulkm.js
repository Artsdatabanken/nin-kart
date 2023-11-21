import React from "react";
import språk from "../../../Funksjoner/språk";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListSubheader,
} from "@material-ui/core";
import config from "../../../Funksjoner/config";

const Ulkm = (props) => {
  const { ulkm, onNavigate } = props;
  if (!ulkm) return null;
  return (
    <>
      <ListSubheader>{språk('uLKM')}</ListSubheader>
      {Object.keys(ulkm).map((key) => {
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
