import React, { Component } from "react";
import tinycolor from "tinycolor2";
import ColorPicker from "Innstillinger/FerdigeMiniElement/ColorPicker";

class FargeVelger extends Component {
  render() {
    const { onUpdateLayerProp, where, color } = this.props;
    let what = "farge";
    let title = "Velg farge";
    if (this.props.what) {
      what = this.props.what;
    }
    if (this.props.title) {
      title = this.props.title;
    }

    return (
      <div className="kartlag_submenu">
        <h1>{title}</h1>
        <h2>Fargekode: {color}</h2>
        <ColorPicker
          color={color}
          alpha
          onChange={farge => {
            const rgbString = tinycolor(farge.rgb).toRgbString();
            onUpdateLayerProp(where, what, rgbString);
          }}
        />
      </div>
    );
  }
}

export default FargeVelger;
