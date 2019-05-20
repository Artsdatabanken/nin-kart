import { Component, default as React } from "react";
import { withRouter } from "react-router";
import tinycolor from "tinycolor2";
import ColorPicker from "Innstillinger/FerdigeMiniElement/ColorPicker";

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

    return (
      <ColorPicker
        tittel={"Fargetone"}
        color={kf.tint}
        alpha
        onChange={farge => {
          const rgbString = tinycolor(farge.rgb).toRgbString();
          this.handleUpdateLayerProp(lag, "tint", rgbString);
        }}
      />
    );
  }
}

export default withRouter(Google);
