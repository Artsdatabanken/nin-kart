import { List, ListSubheader, withTheme } from "@material-ui/core";
import React, { Component } from "react";
import { withRouter } from "react-router";
import { SettingsContext } from "../SettingsContext";
import Seksjon from "./Seksjon";

class Borring extends Component {
  render() {
    const { barn } = this.props;
    if (!barn) return null;
    return (
      <List>
        <ListSubheader>Kunnskap</ListSubheader>
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
                      onClick={() => this.onClick(kode)}
                    />
                  );
                });
            });
          }}
        </SettingsContext.Consumer>
      </List>
    );
  }

  onClick = kode => {
    const { history } = this.props;
    history.push("/katalog/" + kode);
  };
}

export default withRouter(withTheme()(Borring));
