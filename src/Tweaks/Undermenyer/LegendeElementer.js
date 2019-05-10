import { SettingsContext } from "SettingsContext";
import typesystem from "@artsdatabanken/typesystem";
import React, { Component } from "react";
import { withRouter } from "react-router";
import tinycolor from "tinycolor2";
//import Barneliste from "Tweaks/Barneliste";
import ColorPicker from "Tweaks/FerdigeMiniElement/ColorPicker";
import LegendeElement from "./LegendeComponents/LegendeElement";
import språk from "språk";

class LegendeElementer extends Component {
  render() {
    const { history, barn, lag, url, farge } = this.props;
    const { location } = history;
    const undernivå = this.navnPåUndernivå(url);
    console.log("barnlengde: ", barn.length);
    const length = barn.length;

    if (location.search.startsWith("?vis_barn")) {
      const egenskap = location.search.split("=").pop();
      const barnet = barn[egenskap];
      return (
        <ColorPicker
          tittel={"Fyllfarge"}
          color={barnet.farge}
          onChange={farge => {
            const rgbString = tinycolor(farge.rgb).toRgbString();
            this.props.onUpdateLayerProp(
              lag,
              "barn." + egenskap + ".farge",
              rgbString
            );
          }}
        />
      );
    }

    return (
      <SettingsContext.Consumer>
        {context => (
          <>
            {length !== 0 ? (
              <div className="sidebar_element">
                {length}
                <h3 style={{ textTransform: "capitalize" }}>{undernivå}</h3>
                <ul className="ul_block">
                  {Object.keys(barn).map(i => {
                    const node = barn[i];
                    const kode = node.kode;
                    return (
                      <>
                        <LegendeElement
                          key={kode}
                          tittel={språk(node.tittel)}
                          undertittel={context.visKoder && kode}
                          farge={node.farge}
                          kode={kode}
                          goToColourMenu={() => {
                            history.push(
                              history.location.pathname + "?vis_barn=" + i
                            );
                          }}
                          onUpdateLayerProp={(index, felt, verdi) => {
                            barn[index][felt] = verdi;
                            this.handleUpdateLayerProp(kode, "barn", barn);
                          }}
                          aktivtBarn={lag}
                        />
                      </>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <div className="sidebar_element">
                <ColorPicker
                  tittel={"Fyllfarge"}
                  color={farge}
                  onChange={farge => {
                    const rgbString = tinycolor(farge.rgb).toRgbString();
                    this.props.onUpdateLayerProp(lag, "farge", rgbString);
                  }}
                />
              </div>
            )}
          </>
        )}
      </SettingsContext.Consumer>
    );
  }

  handleUpdateLayerProp = (kode, key, value) => {
    this.props.onUpdateLayerProp(kode, "kart.format.polygon." + key, value);
  };

  navnPåUndernivå(kode) {
    const nivåer = typesystem.hentNivaa(kode + "/x");
    if (nivåer.length <= 0) return "underelementer";
    const nivå = nivåer[0];
    return nivå.endsWith("e") ? nivå + "r" : nivå;
  }
}

export default withRouter(LegendeElementer);
