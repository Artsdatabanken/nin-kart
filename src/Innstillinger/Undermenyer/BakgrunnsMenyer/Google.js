import { Component, default as React } from "react";
import { withRouter } from "react-router";
import tinycolor from "tinycolor2";
import ColorPicker from "Innstillinger/FerdigeMiniElement/ColorPicker";

class Google extends Component {
  render() {
    const { aktivtFormat, kartlag, onUpdateLayerProp } = this.props;
    const current = aktivtFormat.aktivtFormat;
    const kf = aktivtFormat.format[current];
    const what = "kart.format." + current + ".tint";
    console.log(kf);

    return (
      <ColorPicker
        tittel={"Fargetone"}
        color={kf.tint}
        alpha
        onChange={farge => {
          const rgbString = tinycolor(farge.rgb).toRgbString();
          onUpdateLayerProp("bakgrunnskart", what, rgbString);
        }}
      />
    );
  }
}

export default withRouter(Google);
