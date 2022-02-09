import React, { Component } from "react";
import tinycolor from "tinycolor2";
import ColorPicker from "../../../../GjenbruksElement/ColorPicker";
import { ListSubheader } from "@material-ui/core";
class FargeVelger extends Component {
  render() {
    const { onUpdateLayerProp, where, color, elementType, title } = this.props;
    let what = "farge";
    if (this.props.what) {
      what = this.props.what;
    }
    let selector_title = "Farge";
    if (title) {
      selector_title = title;
    }

    return (
      <div className="">
        <ListSubheader>{selector_title}</ListSubheader>
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
