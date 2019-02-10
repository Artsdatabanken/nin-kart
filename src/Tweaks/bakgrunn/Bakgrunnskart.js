import SliderSetting from "../SliderSetting";
import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Switch
} from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";
import { Component, default as React } from "react";
import { withRouter } from "react-router";
import { Route, Switch as RouteSwitch } from "react-router-dom";
import tinycolor from "tinycolor2";
import ColorPicker from "../ColorPicker";
import Bakgrunnskartlag from "./Bakgrunnskartlag";
import Tema from "./Tema";

class Bakgrunnskart extends Component {
  handleUpdateLayerProp = (kode, key, value) => {
    this.props.onUpdateLayerProp(kode, "kartformat.osm." + key, value);
  };

  render() {
    const kf = this.props.kartformat.osm;
    return (
      <React.Fragment>
        <RouteSwitch>
          <Route
            path="/lag/:kode/tema"
            render={({ match, history }) => (
              <Tema onUpdateLayerProp={this.handleUpdateLayerProp} />
            )}
          />
          <Route
            path="/lag/:kode/:lag"
            render={({ match, history }) => {
              const { kode, lag } = match.params;
              return (
                <List>
                  <ListSubheader style={{ textTransform: "capitalize" }}>
                    {kode}
                  </ListSubheader>
                  <ColorPicker
                    tittel={"Fyllfarge"}
                    color={kf[lag + "_farge"]}
                    onChange={farge => {
                      const rgbString = tinycolor(farge.rgb).toRgbString();
                      this.handleUpdateLayerProp(
                        kode,
                        lag + "_farge",
                        rgbString
                      );
                    }}
                  />
                </List>
              );
            }}
          />
          <Route
            path="/lag/:kode"
            render={({ match, history }) => {
              const { kode } = match.params;
              return (
                <List>
                  <ListSubheader>Områder</ListSubheader>
                  <ListItem
                    button={true}
                    onClick={() => history.push("/lag/bakgrunnskart/tema")}
                  >
                    <ListItemText primary="Tema" secondary={kf.tema} />
                  </ListItem>
                  <ListSubheader>Områder</ListSubheader>
                  <Bakgrunnskartlag
                    onUpdateLayerProp={this.handleUpdateLayerProp}
                    lagNavn="vann"
                    tittel="Vann"
                    erSynlig={kf.vann}
                    farge={kf.vann_farge}
                  />
                  <Bakgrunnskartlag
                    onUpdateLayerProp={this.handleUpdateLayerProp}
                    lagNavn="land"
                    tittel="Land"
                    erSynlig={kf.land}
                    farge={kf.land_farge}
                  />
                  <Bakgrunnskartlag
                    onUpdateLayerProp={this.handleUpdateLayerProp}
                    lagNavn="transport"
                    tittel="Transport"
                    erSynlig={kf.transport}
                    farge={kf.transport_farge}
                  />
                  <ListSubheader>Etiketter</ListSubheader>
                  <Bakgrunnskartlag
                    onUpdateLayerProp={this.handleUpdateLayerProp}
                    lagNavn="vann_navn"
                    tittel="Vann"
                    erSynlig={kf.vann_navn}
                    farge={kf.vann_navn_farge}
                  />
                  <Bakgrunnskartlag
                    onUpdateLayerProp={this.handleUpdateLayerProp}
                    lagNavn="sted_navn"
                    tittel="Steder"
                    erSynlig={kf.sted_navn}
                    farge={kf.sted_navn_farge}
                  />
                  <Bakgrunnskartlag
                    onUpdateLayerProp={this.handleUpdateLayerProp}
                    lagNavn="sted_navn_stroke"
                    tittel="Steder omriss"
                    erSynlig={kf.sted_navn_stroke}
                    farge={kf.sted_navn_stroke_farge}
                  />
                  <SliderSetting
                    value={kf.sted_navn_stroke_width}
                    min={0}
                    max={10}
                    step={0.2}
                    tittel="Omriss"
                    undertittel={
                      kf.sted_navn_stroke_width.toFixed(1) + " pixler"
                    }
                    onChange={v =>
                      this.handleUpdateLayerProp(
                        kode,
                        "sted_navn_stroke_width",
                        v
                      )
                    }
                    onClick={() =>
                      kf.history.push("/lag/bakgrunnskart/sted_navn_stroke")
                    }
                  />
                  <Bakgrunnskartlag
                    onUpdateLayerProp={this.handleUpdateLayerProp}
                    lagNavn="transport_navn"
                    tittel="Transport"
                    erSynlig={kf.transport_navn}
                    farge={kf.transport_navn_farge}
                  />
                  <ListSubheader>Administrative grenser</ListSubheader>
                  <Bakgrunnskartlag
                    onUpdateLayerProp={this.handleUpdateLayerProp}
                    lagNavn="landegrense"
                    tittel="Riksgrense"
                    erSynlig={kf.sted_navn}
                    farge={kf.landegrense_farge}
                  />
                  <Bakgrunnskartlag
                    onUpdateLayerProp={this.handleUpdateLayerProp}
                    lagNavn="fylkesgrense"
                    tittel="Fylkesgrense"
                    erSynlig={kf.sted_navn}
                    farge={kf.fylkesgrense_farge}
                  />
                  <Bakgrunnskartlag
                    onUpdateLayerProp={this.handleUpdateLayerProp}
                    lagNavn="kommunegrense"
                    tittel="Kommunegrense"
                    erSynlig={kf.sted_navn}
                    farge={kf.kommunegrense_farge}
                  />
                </List>
              );
            }}
          />
        </RouteSwitch>
      </React.Fragment>
    );
  }
}

export default withRouter(withTheme()(Bakgrunnskart));
