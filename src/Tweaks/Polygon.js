import språk from "../språk";
import { SettingsContext } from "../SettingsContext";
import typesystem from "@artsdatabanken/typesystem";
import {
  List,
  ListItem,
  Select,
  ListSubheader,
  withStyles
} from "@material-ui/core";
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
import Veksle from "./Veksle";

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
      tittel,
      bbox,
      onFitBounds,
      onMouseEnter,
      onMouseLeave,
      onRemoveSelectedLayer,
      onUpdateLayerProp,
      aktivtKartformat,
      kanSlettes,
      barn,
      visBarn,
      lag,
      kartformat,
      classes
    } = this.props;
    const { visEtiketter = false } = kartformat.polygon;
    const undernivå = this.navnPåUndernivå(kode);
    return (
      <SettingsContext.Consumer>
        {context => (
          <React.Fragment>
            <ListSubheader>{språk(tittel)}</ListSubheader>
            <Select
              native
              value={aktivtKartformat}
              onChange={() =>
                this.handleUpdateLayerProp(kode, "aktivtKartformat")
              }
              inputProps={{
                name: "age",
                id: "age-native-simple"
              }}
            >
              {Object.keys(kartformat).map(kf => (
                <option key={kf} value={kf}>
                  {kf}
                </option>
              ))}
            </Select>
            <Veksle
              tittel="Vis etiketter"
              toggled={visEtiketter}
              onClick={() =>
                this.handleUpdateLayerProp(kode, "visEtiketter", !visEtiketter)
              }
            />
            {Object.keys(barn).length > 0 && (
              <Veksle
                tittel={"Vis " + undernivå}
                toggled={visBarn}
                onClick={() =>
                  this.handleUpdateLayerProp(kode, "visBarn", !visBarn)
                }
              />
            )}
            {visBarn ? (
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
            ) : (
              <ColorPicker
                tittel={"Fyllfarge"}
                color={farge}
                onChange={farge => {
                  const rgbString = tinycolor(farge.rgb).toRgbString();
                  this.handleUpdateLayerProp(kode, "farge", rgbString);
                }}
              />
            )}
            <ListItem>
              {kanSlettes && (
                <Button
                  color="primary"
                  onClick={e => {
                    onRemoveSelectedLayer(kode);
                  }}
                  icon={<ActionDelete />}
                >
                  Fjern
                </Button>
              )}
              <Button
                color="primary"
                onClick={() => {
                  history.push("/katalog/" + kode);
                }}
                icon={<ActionInfo />}
              >
                <InfoOutlined className={classes.iconSmall} />
                Info
              </Button>
              {bbox && (
                <Button
                  color="primary"
                  onClick={() => {
                    onFitBounds(bbox);
                  }}
                >
                  <ZoomOutMap className={classes.iconSmall} />
                  Zoom til
                </Button>
              )}
            </ListItem>
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
