import { ListSubheader } from "@material-ui/core";
import React from "react";
import { CustomPicker } from "react-color";
import ChromePointerCircle from "react-color/lib/components/chrome/ChromePointerCircle";
import { Alpha, Hue, Saturation } from "react-color/lib/components/common";
import ChromePointer from "react-color/lib/components/slider/SliderPointer";
class ColorPicker extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ListSubheader>{this.props.tittel}</ListSubheader>
        <Blokk height={256}>
          <Saturation
            pointer={ChromePointerCircle}
            style={{ height: 256 }}
            {...this.props}
          />
        </Blokk>
        <Blokk height={14}>
          <Hue pointer={ChromePointer} height={14} {...this.props} />
        </Blokk>
        {this.props.alpha && (
          <Blokk>
            <Alpha pointer={ChromePointer} {...this.props} />
          </Blokk>
        )}
      </React.Fragment>
    );
  }
}

const Blokk = ({ height, children }) => (
  <div
    style={{
      marginLeft: 16,
      marginRight: 16,
      marginBottom: 16,
      height: height || 10,
      position: "relative"
    }}
  >
    {children}
  </div>
);

export default CustomPicker(ColorPicker);
