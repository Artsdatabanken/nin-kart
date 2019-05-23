import React, { Component } from "react";
import tinycolor from "tinycolor2";
import ColorPicker from "Innstillinger/FerdigeMiniElement/ColorPicker";

class FargeVelger extends Component {
  render() {
    const { kartlag, onUpdateLayerProp, where, color } = this.props;

    return (
      <div>
        <ColorPicker
          color={color}
          onChange={farge => {
            const rgbString = tinycolor(farge.rgb).toRgbString();
            onUpdateLayerProp(where, "farge", rgbString);
          }}
        />
      </div>
    );
  }
}

export default FargeVelger;
