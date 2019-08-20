import { SettingsContext } from "SettingsContext";
import React, { Component } from "react";
import { withRouter } from "react-router";
import LegendeElement from "./LegendeComponents/LegendeElement";

class LegendeElementer extends Component {
  state = {
    items_to_load: 5
  };
  render() {
    const { kartlag, onUpdateLayerProp, skjul_meny_tittel } = this.props;
    let barn;

    if (kartlag.barn.length === 0) {
      let node = kartlag;
      let kode = node.kode;
      return (
        <SettingsContext.Consumer>
          {context => (
            <div className="widescreen_sidebar_element">
              <ul className="ul_block">
                <LegendeElement
                  key={kode}
                  tittel={node.tittel}
                  koder={context.visKoder && kode}
                  farge={node.farge}
                  erSynlig={
                    node.hasOwnProperty("erSynlig") ? node.erSynlig : true
                  }
                  kode={kode}
                  onUpdateLayerProp={onUpdateLayerProp}
                />
              </ul>
            </div>
          )}
        </SettingsContext.Consumer>
      );
    }
    barn = kartlag.barn;
    const barn_length = barn.length;

    return (
      <SettingsContext.Consumer>
        {context => (
          <div className="widescreen_sidebar_element">
            {!skjul_meny_tittel && <h3>Juster underelemeter </h3>}
            <ul className="ul_block">
              {Object.keys(barn).map(i => {
                while (i < this.state.items_to_load) {
                  const node = barn[i];
                  const kode = node.kode;
                  return (
                    <LegendeElement
                      key={kode}
                      tittel={node.tittel}
                      koder={context.visKoder && kode}
                      farge={node.farge}
                      erSynlig={
                        node.hasOwnProperty("erSynlig") ? node.erSynlig : true
                      }
                      kode={kode}
                      onUpdateLayerProp={onUpdateLayerProp}
                      elementType="barn"
                    />
                  );
                }
                return null;
              })}
            </ul>
            {barn_length > this.state.items_to_load && (
              <button
                className="load_more_button"
                onClick={() =>
                  this.setState({ items_to_load: this.state.items_to_load + 5 })
                }
              >
                ... <br />
                Last inn fler
              </button>
            )}
          </div>
        )}
      </SettingsContext.Consumer>
    );
  }
}

export default withRouter(LegendeElementer);
