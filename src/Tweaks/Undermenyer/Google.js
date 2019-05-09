import { List, ListSubheader } from "@material-ui/core";
import { Component, default as React } from "react";
import { withRouter } from "react-router";
import tinycolor from "tinycolor2";
import ColorPicker from "Tweaks/FerdigeMiniElement/ColorPicker";
import Tema from "./bakgrunn/Tema";
import TemaButton from "./bakgrunn/TemaButton";

class Google extends Component {
  handleUpdateLayerProp = (kode, key, value) => {
    this.props.onUpdateLayerProp(
      kode,
      `kart.format.${this.props.kart.aktivtFormat}.${key}`,
      value
    );
  };

  render() {
    const { location, kart } = this.props;
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
        <ListSubheader>Tema</ListSubheader>
        <TemaButton type={aktivtFormat} />
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

export default withRouter(Google);
