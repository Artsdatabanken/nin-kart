import { SettingsContext } from "../SettingsContext";
import typesystem from "@artsdatabanken/typesystem";
import { List, ListItem, ListSubheader, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { withTheme } from "@material-ui/core/styles";
import { InfoOutlined, ZoomOutMap } from "@material-ui/icons/";
import ActionDelete from "@material-ui/icons/Delete";
import ActionInfo from "@material-ui/icons/Info";
import React, { Component } from "react";
import { withRouter } from "react-router";
import tinycolor from "tinycolor2";
import Barneliste from "./Barneliste";
import ColorPicker from "./ColorPicker";

const styles = {
  iconSmall: {
    fontSize: 20,
    marginRight: 8
  }
};

class Polygon extends Component {
  render() {
    const {
      kode,
      farge,
      history,
      bbox,
      onFitBounds,
      onMouseEnter,
      onMouseLeave,
      onRemoveSelectedLayer,
      kanSlettes,
      barn,
      lag,
      classes
    } = this.props;
    const { location } = history;
    const undernivå = this.navnPåUndernivå(kode);
    if (location.search.startsWith("?vis_barn")) {
      const egenskap = location.search.split("=").pop();
      const barnet = barn[egenskap];
      console.log(egenskap, barn, barnet);
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
          <React.Fragment>
            <List>
              <ListSubheader style={{ textTransform: "capitalize" }}>
                {undernivå}
              </ListSubheader>
              <Barneliste
                forelderkode={kode}
                visKoder={context.visKoder}
                aktivtBarn={lag}
                barn={barn}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onUpdateLayerProp={(index, felt, verdi) => {
                  barn[index][felt] = verdi;
                  this.handleUpdateLayerProp(kode, "barn", barn);
                }}
              />
            </List>
            <ColorPicker
              tittel={"Fyllfarge"}
              color={farge}
              onChange={farge => {
                const rgbString = tinycolor(farge.rgb).toRgbString();
                this.handleUpdateLayerProp(kode, "farge", rgbString);
              }}
            />
          </React.Fragment>
        )}
      </SettingsContext.Consumer>
    );
  }

  handleUpdateLayerProp = (kode, key, value) => {
    this.props.onUpdateLayerProp(kode, "kartformat.polygon." + key, value);
  };

  navnPåUndernivå(kode) {
    const nivåer = typesystem.hentNivaa(kode + "-1");
    if (nivåer.length <= 0) return "underelementer";
    const nivå = nivåer[0];
    return nivå.endsWith("e") ? nivå + "r" : nivå;
  }
}

export default withStyles(styles)(withRouter(withTheme()(Polygon)));
