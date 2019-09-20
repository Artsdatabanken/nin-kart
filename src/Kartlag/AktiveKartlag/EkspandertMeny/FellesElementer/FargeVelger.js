import React, { Component } from "react";
import tinycolor from "tinycolor2";
import ColorPicker from "GjenbruksElement/ColorPicker";

class FargeVelger extends Component {
  render() {
    const { onUpdateLayerProp, where, color, elementType } = this.props;
    let what = "farge";
    let title = "Velg farge for kartlaget";
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
            if (elementType) {
              onUpdateLayerProp(where, what, rgbString, "barn");
            } else {
              onUpdateLayerProp(where, what, rgbString);
            }
          }}
        />
      </div>
    );
  }
}

export default FargeVelger;
