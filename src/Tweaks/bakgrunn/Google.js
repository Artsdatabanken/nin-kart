import { List, ListItem, ListItemText, ListSubheader } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";
import { Component, default as React } from "react";
import { withRouter } from "react-router";
import tinycolor from "tinycolor2";
import ColorPicker from "../ColorPicker";
import Tema from "./Tema";

class Bakgrunnskart extends Component {
  handleUpdateLayerProp = (kode, key, value) => {
    this.props.onUpdateLayerProp(
      kode,
      `kart.format.${this.props.kart.aktivtFormat}.${key}`,
      value
    );
  };

  render() {
    const { location, history, kart } = this.props;
    const lag = location.pathname.substring(1);
    const aktivtFormat = kart.aktivtFormat;
    const kf = kart.format[aktivtFormat];
    if (location.search.startsWith("?vis_tema"))
      return (
        <Tema
          onUpdateLayerProp={this.props.onUpdateLayerProp}
          valgt={aktivtFormat}
        />
      );
    return (
      <List>
        <ListItem button={true} onClick={() => history.push("?vis_tema")}>
          <ListItemText primary="Forhåndsdefinert tema" secondary={kf.tittel} />
        </ListItem>
        <ListSubheader>Områder</ListSubheader>
        <ColorPicker
          tittel={"Fargetone"}
          color={kf.tint}
          alpha
          onChange={farge => {
            const rgbString = tinycolor(farge.rgb).toRgbString();
            this.handleUpdateLayerProp(lag, "tint", rgbString);
          }}
        />
      </List>
    );
  }
}

export default withRouter(withTheme()(Bakgrunnskart));
