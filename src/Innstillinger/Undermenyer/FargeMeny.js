import { Component, default as React } from "react";
import tinycolor from "tinycolor2";
import ColorPicker from "Innstillinger/FerdigeMiniElement/ColorPicker";

class VisFarge extends Component {
  render() {
    const { kartlag, onUpdateLayerProp } = this.props;
    const layer = kartlag.kode;

    return (
      <div className="colour_adjustment_container">
        <div className="sidebar_element">
          ,<h1>Fargejusteringer</h1>
          <h2>Bakgrunnskart</h2>
        </div>

        <div className="sidebar_element">
          <h3>Fyllfarge</h3>
          <ColorPicker
            color={kartlag.farge}
            onChange={farge => {
              const rgbString = tinycolor(farge.rgb).toRgbString();
              console.log(layer);
              onUpdateLayerProp(layer, "farge", rgbString);
            }}
          />
        </div>
      </div>
    );
  }
}

export default VisFarge;
