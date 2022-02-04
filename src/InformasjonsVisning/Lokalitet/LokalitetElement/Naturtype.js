import React from "react";
import språk from "../../../Funksjoner/språk";
import {
  Avatar,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemAvatar
} from "@material-ui/core";
import SectionExpand from "../../../GjenbruksElement/SectionExpand";
import config from "../../../Funksjoner/config";
import Beskrivelsessystem from "./Beskrivelsessystem";
import Ulkm from "./Ulkm";
import Kartlegging from "./Kartlegging";
import { getParentUrl } from "../../../AppSettings/AppFunksjoner/fetchMeta";

const sameParent = (array, i) => {
  array = array.map(e => e[i]);
  for (let n = 1; n < array.length; n++) {
    const current = array[n];
    const previous = array[n - 1];
    if (!current || !previous) return false;
    if (current.kode !== previous.kode) return false;
  }
  return true;
};

const finnFellesOverordnet = typer => {
  if (!typer) return null;
  if (typer.length === 0) return null;
  if (typer.length === 1) return typer[0].overordnet[0];
  const oos = typer.map(e => e.overordnet.reverse());
  let max = Math.max(...oos.map(e => e.length));
  for (let i = 1; i < max; i++) {
    if (!sameParent(oos, i)) return oos[0][i - 1];
  }
  return oos[0].pop();
};

const Naturtype = props => {
  const { typer, variabler, ulkm, onNavigate, onNavigateToTab } = props;
  if (!typer) return null;
  const forelder = finnFellesOverordnet(typer);
  if (!forelder) return null;
  // Testkoordinat for alle tre: ?lng=10.473060607910158&lat=60.385192661736745
  return (
    <div className="section">
      <h3>
        <img
          src={config.logo("Natur_i_Norge/Natursystem/Typeinndeling")}
          style={{ position: "relative", top: 4, marginRight: 8 }}
          alt=""
        />
        Natursystem
      </h3>

      <div className="subsection">
        <h4>Naturtype</h4>

        <SectionExpand title={"Naturtype"}>
          <>
            {typer.map(type => (
              <Item
                key={`${type.kode}_${type.andel}`}
                primary={språk(type.tittel)}
                secondary={type.andel !== 100 && type.andel * 10 + " %"}
                url={type.url}
                parenturl={getParentUrl(type)}
                målestokk={type.kart && "1:" + type.kart.målestokk}
                onClick={onNavigate}
              />
            ))}
          </>
        </SectionExpand>

        {ulkm && (
          <SectionExpand title={"Underordnede komplekse miljøvariabler (uLKM)"}>
            <Ulkm ulkm={ulkm} onNavigate={onNavigate} />
          </SectionExpand>
        )}

        {variabler && (
          <SectionExpand title={"Variabler"}>
            <Beskrivelsessystem variabler={variabler} onNavigate={onNavigate} />
          </SectionExpand>
        )}
      </div>
      <Kartlegging punkt={props.punkt} />
    </div>
  );
};

const Item = ({ primary, secondary, målestokk, parenturl, url, onClick }) => {
  return (
    <ListItem button onClick={() => onClick(parenturl)}>
      <ListItemAvatar>
        <Avatar>
          {url && (
            <img
              alt=""
              src={config.foto(url)}
              style={{ height: 40, width: 40 }}
            />
          )}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={primary} secondary={secondary}></ListItemText>
      <ListItemSecondaryAction style={{ fontSize: 10 }}>
        {målestokk}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Naturtype;
