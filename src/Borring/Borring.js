import backend from "../backend";
import { List, ListItem, ListItemText, withTheme } from "@material-ui/core";
import React, { Component } from "react";
import { withRouter } from "react-router";
import { SettingsContext } from "../SettingsContext";
import Seksjon from "./Seksjon";

class Borring extends Component {
  render() {
    const { barn = {} } = this.props;
    return (
      <List>
        {Object.keys(barn).length <= 0 ? (
          <ListItem>
            <ListItemText primary="Finner ingen opplysninger." />
          </ListItem>
        ) : (
          <SettingsContext.Consumer>
            {context => {
              return ["VV", "AO", "LA", "NA", "RL"].map(prefix => {
                return Object.keys(barn)
                  .filter(key => key.indexOf(prefix) === 0)
                  .map(kode => {
                    const node = barn[kode];
                    if (!node) return null;
                    if (!node.values) return null;
                    return (
                      <Seksjon
                        key={kode}
                        tittel={node.title}
                        kode={kode}
                        kategori={node.title}
                        node={node}
                        visKoder={context.visKoder}
                        onClick={() => this.handleClick(kode, node)}
                      />
                    );
                  });
              });
            }}
          </SettingsContext.Consumer>
        )}
      </List>
    );
  }

  getInnerMostSingleChild(kode, node) {
    if (!node.values) return kode;
    const keys = Object.keys(node.values);
    if (keys.length !== 1) return kode;
    return this.getInnerMostSingleChild(keys[0], node.values[keys[0]]);
  }

  handleClick = (kode, node) => {
    kode = this.getInnerMostSingleChild(kode, node);
    const { history } = this.props;
    //  console.log(kode);
    kode = hack(kode);
    //  console.log(kode);
    backend.søk(kode).then(json => {
      // TODO: Mofify lat,lon query API to return URLs
      let hit = json.result[0];
      for (const r of json.result) {
        if (r.kode.endsWith(kode)) hit = r;
      }
      if (hit) history.push("/" + hit.url);
    });
  };
}

function hack(kode) {
  if (kode.startsWith("NA-LKM")) return kode;
  if (kode.startsWith("NA-BS")) return kode;
  if (kode.startsWith("LA-KLG")) return kode;
  if (kode.startsWith("LA-MP")) return kode;
  kode = kode.replace("LA-", "NN-LA-TI-");
  kode = kode.replace("NA-", "NN-NA-TI-");
  return kode;
}

export default withRouter(withTheme()(Borring));
