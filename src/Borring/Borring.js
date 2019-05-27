import backend from "Funksjoner/backend";
import React, { Component } from "react";
import { withRouter } from "react-router";
import { SettingsContext } from "../SettingsContext";
import Seksjon from "./Seksjon";

class Borring extends Component {
  render() {
    const { barn = {} } = this.props;
    let current_headline = "";
    let new_object = false;
    return (
      <div className="sidebar_element paddingless">
        {Object.keys(barn).length <= 0 ? (
          <div className="sidebar_element">"Finner ingen opplysninger."</div>
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
                    let current_prefix = kode.split("-")[0];
                    if (current_headline !== current_prefix) {
                      current_headline = current_prefix;
                      new_object = true;
                    } else {
                      new_object = false;
                    }

                    return (
                      <Seksjon
                        new_object={new_object}
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
      </div>
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
    kode = hack(kode);
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

export default withRouter(Borring);
