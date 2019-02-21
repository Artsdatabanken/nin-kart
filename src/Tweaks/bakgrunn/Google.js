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
      `kartformat.${this.props.aktivtKartformat}.${key}`,
      value
    );
  };

  render() {
    const { aktivtKartformat, location, history } = this.props;
    const lag = location.pathname.substring(1);
    const kf = this.props.kartformat[aktivtKartformat];
    if (location.search.startsWith("?vis_tema"))
      return (
        <Tema
          onUpdateLayerProp={this.props.onUpdateLayerProp}
          valgt={aktivtKartformat}
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
