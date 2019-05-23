import { SettingsContext } from "../SettingsContext";
import React, { Component } from "react";
import tinycolor from "tinycolor2";
import ColorPicker from "./ColorPicker";

class Ruter extends Component {
  render() {
    const { kode, farge } = this.props;
    return (
      <SettingsContext.Consumer>
        {context => (
          <>
            <ColorPicker
              tittel={"Fyllfarge"}
              color={farge}
              onChange={farge => {
                const rgbString = tinycolor(farge.rgb).toRgbString();
                this.handleUpdateLayerProp(kode, "farge", rgbString);
              }}
            />
          </>
        )}
      </SettingsContext.Consumer>
    );
  }

  handleUpdateLayerProp = (kode, key, value) => {
    this.props.onUpdateLayerProp(kode, key, value);
  };
}

export default Ruter;
