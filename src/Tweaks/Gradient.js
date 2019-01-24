import typesystem from "@artsdatabanken/typesystem";
import { List, ListSubheader, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { withTheme } from "@material-ui/core/styles";
import { SwapVert, ZoomOutMap } from "@material-ui/icons/";
import ActionDelete from "@material-ui/icons/Delete";
import ActionInfo from "@material-ui/icons/Info";
import React, { Component } from "react";
import { withRouter } from "react-router";
import tinycolor from "tinycolor2";
import Barneliste from "./Barneliste";
import SliderSetting from "./SliderSetting";
import ColorPicker from "./ColorPicker";
import Veksle from "./Veksle";

const styles = {
  iconSmall: {
    fontSize: 20,
    marginRight: 8
  }
};

class Gradient extends Component {
  render() {
    const {
      kode,
      url,
      farge,
      history,
      tittel,
      bbox,
      visEtiketter,
      onFitBounds,
      onMouseEnter,
      onMouseLeave,
      onRemoveSelectedLayer,
      onUpdateLayerProp,
      kanSlettes,
      barn,
      visBarn,
      gradient,
      classes
    } = this.props;
    const { filterMin, filterMax } = gradient;
    const undernivå = this.navnPåUndernivå(kode);
    const spread = 0.015;
    return (
      <React.Fragment>
        <ListSubheader>{tittel}</ListSubheader>
        <SliderSetting
          value={filterMin}
          decimals={2}
          min={0}
          max={1}
          step={0.005}
          tittel="Minimum"
          undertittel={filterMin.toFixed(2)}
          icon={<SwapVert />}
          onChange={v => {
            onUpdateLayerProp(kode, "gradient.filterMin", v);
            if (gradient.filterMax <= gradient.filterMin + spread)
              onUpdateLayerProp(
                kode,
                "gradient.filterMax",
                Math.min(1.0, gradient.filterMin + spread)
              );
          }}
        />
        <SliderSetting
          value={filterMax}
          decimals={2}
          min={0}
          max={1}
          step={0.005}
          tittel="Maksimum"
          undertittel={filterMax.toFixed(2)}
          icon={<SwapVert />}
          onChange={v => {
            onUpdateLayerProp(kode, "gradient.filterMax", v);
            if (gradient.filterMax <= gradient.filterMin + spread)
              onUpdateLayerProp(
                kode,
                "gradient.filterMin",
                Math.max(0.0, gradient.filterMax - spread)
              );
          }}
        />
        <Veksle
          tittel="Vis etiketter"
          toggled={visEtiketter}
          onClick={() => onUpdateLayerProp(kode, "visEtiketter", !visEtiketter)}
        />
        {Object.keys(barn).length > 0 && (
          <Veksle
            tittel={"Vis " + undernivå}
            toggled={visBarn}
            onClick={() => onUpdateLayerProp(kode, "visBarn", !visBarn)}
          />
        )}
        {visBarn ? (
          <List>
            <ListSubheader style={{ textTransform: "capitalize" }}>
              {undernivå}
            </ListSubheader>
            <Barneliste
              forelderkode={kode}
              aktivtBarn={"lag"}
              barn={barn}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onUpdateLayerProp={(index, felt, verdi) => {
                barn[index][felt] = verdi;
                onUpdateLayerProp(kode, "barn", barn);
              }}
            />
          </List>
        ) : (
          <ColorPicker
            tittel={"Fyllfarge"}
            color={farge}
            onChange={farge => {
              const rgbString = tinycolor(farge.rgb).toRgbString();
              onUpdateLayerProp(kode, "farge", rgbString);
            }}
          />
        )}
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
            history.push("/" + url);
          }}
          icon={<ActionInfo />}
        >
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
      </React.Fragment>
    );
  }

  navnPåUndernivå(kode) {
    const nivåer = typesystem.hentNivaa(kode + "-1");
    if (nivåer.length <= 0) return "underelementer";
    const nivå = nivåer[0];
    return nivå.endsWith("e") ? nivå + "r" : nivå;
  }
}

export default withStyles(styles)(withRouter(withTheme()(Gradient)));
