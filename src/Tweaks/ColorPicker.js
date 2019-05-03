import React from "react";
import { CustomPicker } from "react-color";
import ChromePointerCircle from "react-color/lib/components/chrome/ChromePointerCircle";
import { Alpha, Hue, Saturation } from "react-color/lib/components/common";
import ChromePointer from "react-color/lib/components/slider/SliderPointer";

class ColorPicker extends React.Component {
  render() {
    return (
      <div className="colorPicker_container">
        <div className="colorPicker">
          <Saturation pointer={ChromePointerCircle} {...this.props} />
        </div>

        <div className="colorSlider">
          <Hue pointer={ChromePointer} {...this.props} />
        </div>

        {this.props.alpha && (
          <div className="alphaPointer">
            <Alpha pointer={ChromePointer} {...this.props} />
          </div>
        )}
      </div>
    );
  }
}

export default CustomPicker(ColorPicker);
