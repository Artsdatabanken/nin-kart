import React, { Component } from "react";
import tinycolor from "tinycolor2";
import ColorPicker from "GjenbruksElement/ColorPicker";

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
        <h3>{title}</h3>
        <ColorPicker
          tabIndex="1"
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
