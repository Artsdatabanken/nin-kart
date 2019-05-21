import { SettingsContext } from "SettingsContext";
//import typesystem from "@artsdatabanken/typesystem";
import React, { Component } from "react";
import { withRouter } from "react-router";
//import tinycolor from "tinycolor2";
//import Barneliste from "Innstillinger/Barneliste";
//import ColorPicker from "Innstillinger/FerdigeMiniElement/ColorPicker";
import LegendeElement from "./LegendeComponents/LegendeElement";

class LegendeElementer extends Component {
  render() {
    const { kartlag, onUpdateLayerProp } = this.props;
    const barn = kartlag.barn;
    console.log("barn:  ", barn);
    return (
      <SettingsContext.Consumer>
        {context => (
          <div className="sidebar_element widescreen_sidebar_element">
            <h3>undernivå:</h3>
            <ul className="ul_block">
              {Object.keys(barn).map(i => {
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
                    onUpdateLayerProp={(index, felt, verdi) => {
                      node[felt] = verdi;
                      onUpdateLayerProp(kartlag, "barn", barn);
                    }}
                    aktivtBarn={kartlag}
                  />
                );
              })}
            </ul>
          </div>
        )}
      </SettingsContext.Consumer>
    );
  }
}

export default withRouter(LegendeElementer);
