import { List, ListItem, ListItemText, ListSubheader } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";
import { Component, default as React } from "react";
import { withRouter } from "react-router";
import { Route, Switch as RouteSwitch } from "react-router-dom";
import tinycolor from "tinycolor2";
import ColorPicker from "../ColorPicker";
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
              const { kode } = match.params;
              return (
                <List>
                  <ColorPicker
                    tittel={"Fyllfarge"}
                    color={kf.tint}
                    onChange={farge => {
                      const rgbString = tinycolor(farge.rgb).toRgbString();
                      this.handleUpdateLayerProp(kode, "tint", rgbString);
                    }}
                  />
                </List>
              );
            }}
          />
          <Route
            path="/visning/:kode"
            render={({ match, history }) => {
              const { kode } = match.params;
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
                  <ColorPicker
                    tittel={"Fyllfarge"}
                    color={kf.tint}
                    alpha
                    onChange={farge => {
                      const rgbString = tinycolor(farge.rgb).toRgbString();
                      this.handleUpdateLayerProp(kode, "tint", rgbString);
                    }}
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
