import { SettingsContext } from "../../../../SettingsContext";
import React, { Component } from "react";
import { withRouter } from "react-router";
import LegendeElement from "./LegendeComponents/LegendeElement";

class LegendeElementer extends Component {
  state = {
    items_to_load: 5
  };
  render() {
    const { meta, skjul_meny_tittel, onUpdateLayerProp } = this.props;
    const { barn } = meta;
    const hasNoChildren = !barn?.length;

    if (hasNoChildren) {
      return (
        <SettingsContext.Consumer>
          {context => (
            <div className="widescreen_sidebar_element">
              <ul className="ul_block">
                <LegendeElement
                  key={meta.kode}
                  tittel={meta.tittel}
                  koder={context.visKoder && meta.kode}
                  farge={meta.farge}
                  erSynlig={
                    meta.hasOwnProperty("erSynlig") ? meta.erSynlig : true
                  }
                  kode={meta.kode}
                  onUpdateLayerProp={onUpdateLayerProp}
                />
              </ul>
            </div>
          )}
        </SettingsContext.Consumer>
      );
    }

    return (
      <SettingsContext.Consumer>
        {context => (
          <div className="widescreen_sidebar_element">
            {!skjul_meny_tittel && <h3>Juster underelemeter </h3>}
            <ul className="ul_block">
              {barn.map((node, i) => {
                while (i < this.state.items_to_load) {
                  const { farge, kode, tittel } = node;
                  const erSynlig = node.hasOwnProperty("erSynlig")
                    ? node.erSynlig
                    : true;
                  return (
                    <LegendeElement
                      key={kode}
                      tittel={tittel}
                      koder={context.visKoder && kode}
                      farge={farge}
                      erSynlig={erSynlig}
                      kode={kode}
                      onUpdateLayerProp={this.props.onUpdateLayerProp}
                      elementType="barn"
                    />
                  );
                }
                return null;
              })}
            </ul>
            {barn.length > this.state.items_to_load && (
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
