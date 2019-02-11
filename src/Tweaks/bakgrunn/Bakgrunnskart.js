import SliderSetting from "../SliderSetting";
import { List, ListItem, ListItemText, ListSubheader } from "@material-ui/core";
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
    this.props.onUpdateLayerProp(
      kode,
      `kartformat.${this.props.aktivtKartformat}.${key}`,
      value
    );
  };

  render() {
    const { aktivtKartformat } = this.props;
    const kf = this.props.kartformat[aktivtKartformat];
    return (
      <React.Fragment>
        <RouteSwitch>
          <Route
            path="/visning/:kode/tema"
            render={({ match, history }) => (
              <Tema
                onUpdateLayerProp={this.props.onUpdateLayerProp}
                valgt={aktivtKartformat}
              />
            )}
          />
          <Route
            path="/visning/:kode/:lag"
            render={({ match, history }) => {
              const { kode, lag } = match.params;
              return (
                <List>
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
                  {kf[lag + "_stroke_farge"] && (
                    <React.Fragment>
                      <ListSubheader>Omriss</ListSubheader>
                      <SliderSetting
                        value={kf[lag + "_stroke_width"]}
                        min={0}
                        max={10}
                        step={0.2}
                        tittel={
                          "Tykkelse: " +
                          kf.sted_navn_stroke_width.toFixed(1) +
                          " piksler"
                        }
                        onChange={v =>
                          this.handleUpdateLayerProp(
                            kode,
                            lag + "_stroke_width",
                            v
                          )
                        }
                        onClick={() =>
                          kf.history.push(
                            "/visning/bakgrunnskart/sted_navn_stroke"
                          )
                        }
                      />
                      <ColorPicker
                        color={kf[lag + "_stroke_farge"]}
                        onChange={farge => {
                          const rgbString = tinycolor(farge.rgb).toRgbString();
                          this.handleUpdateLayerProp(
                            kode,
                            lag + "_stroke_farge",
                            rgbString
                          );
                        }}
                      />
                    </React.Fragment>
                  )}
                </List>
              );
            }}
          />
          <Route
            path="/visning/:kode"
            render={({ match, history }) => {
              return (
                <List>
                  <ListItem
                    button={true}
                    onClick={() => history.push("/visning/bakgrunnskart/tema")}
                  >
                    <ListItemText
                      primary="Forhåndsdefinert tema"
                      secondary={kf.tittel}
                    />
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
                    erSynlig={kf.landegrense}
                    farge={kf.landegrense_farge}
                  />
                  <Bakgrunnskartlag
                    onUpdateLayerProp={this.handleUpdateLayerProp}
                    lagNavn="fylkesgrense"
                    tittel="Fylkesgrense"
                    erSynlig={kf.fylkesgrense}
                    farge={kf.fylkesgrense_farge}
                  />
                  <Bakgrunnskartlag
                    onUpdateLayerProp={this.handleUpdateLayerProp}
                    lagNavn="kommunegrense"
                    tittel="Kommunegrense"
                    erSynlig={kf.kommunegrense}
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
