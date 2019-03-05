import backend from "../backend";
import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  withTheme
} from "@material-ui/core";
import React, { Component } from "react";
import { withRouter } from "react-router";
import { SettingsContext } from "../SettingsContext";
import Seksjon from "./Seksjon";

class Borring extends Component {
  render() {
    const { barn = {} } = this.props;
    return (
      <List>
        <ListSubheader>Kunnskap</ListSubheader>
        {Object.keys(barn).length <= 0 ? (
          <ListItem>
            <ListItemText primary="Fant ingen opplysninger." />
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
    backend.søk(kode).then(json => {
      // TODO: Mofify lat,lon query API to return URL
      const hit = json.result[0];
      history.push("/" + hit.url);
    });
  };
}

export default withRouter(withTheme()(Borring));
