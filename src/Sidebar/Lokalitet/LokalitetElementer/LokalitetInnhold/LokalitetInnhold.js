import React, { Component } from "react";
import { withRouter } from "react-router";
import { SettingsContext } from "SettingsContext";
import LokalitetSeksjon from "./LokalitetSeksjoner/LokalitetSeksjon";
import navigateToSubElement from "Sidebar/Lokalitet/LokalitetFunksjoner/navigateToSubElement";

class LokalitetInnhold extends Component {
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
                      <LokalitetSeksjon
                        new_object={new_object}
                        key={kode}
                        tittel={node.title}
                        kode={kode}
                        kategori={node.title}
                        node={node}
                        visKoder={context.visKoder}
                        onClick={() =>
                          navigateToSubElement(kode, node, this.props.history)
                        }
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
}

export default withRouter(LokalitetInnhold);
