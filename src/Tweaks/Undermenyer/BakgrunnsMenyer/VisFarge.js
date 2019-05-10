import SliderSetting from "Tweaks/SliderSetting";
import { Component, default as React } from "react";
//import { withRouter } from "react-router";
import tinycolor from "tinycolor2";
import ColorPicker from "Tweaks/FerdigeMiniElement/ColorPicker";

class VisFarge extends Component {
  //Duplikat, men ga opp å finne bedre løsning
  handleUpdateLayerProp = (lag, key, value) => {
    this.props.onUpdateLayerProp(
      lag,
      `kart.format.${this.props.kartformat}.${key}`,
      value
    );
  };
  render() {
    const { kf, location, history } = this.props;
    const lag = location.pathname.substring(1);
    const egenskap = location.search.split("=").pop();

    return (
      <div className="colour_adjustment_container">
        <div className="sidebar_element">
          <h1>Fargejusteringer</h1>
          <h2>Bakgrunnskart</h2>
        </div>

        <div className="sidebar_element">
          <h3>Fyllfarge</h3>
          <ColorPicker
            color={kf[egenskap + "_farge"]}
            onChange={farge => {
              const rgbString = tinycolor(farge.rgb).toRgbString();
              this.handleUpdateLayerProp(lag, egenskap + "_farge", rgbString);
            }}
          />
        </div>

        {kf[egenskap + "_stroke_farge"] && (
          <div className="sidebar_element">
            <h3>Omriss rundt elementene</h3>

            <h4>Velg farge på omriss</h4>
            <ColorPicker
              color={kf[egenskap + "_stroke_farge"]}
              onChange={farge => {
                const rgbString = tinycolor(farge.rgb).toRgbString();
                this.handleUpdateLayerProp(
                  lag,
                  egenskap + "_stroke_farge",
                  rgbString
                );
              }}
            />

            <h4>Velg tykkelse på omriss</h4>

            <SliderSetting
              value={kf[egenskap + "_stroke_width"] || 0}
              min={0}
              max={10}
              step={0.2}
              tittel={
                "Tykkelse: " +
                (kf[egenskap + "_stroke_width"] || 0).toFixed(1) +
                " piksler"
              }
              onChange={v =>
                this.handleUpdateLayerProp(lag, egenskap + "_stroke_width", v)
              }
              onClick={() =>
                history.push(
                  history.location.pathname + "?vis_farge=sted_navn_stroke"
                )
              }
            />
          </div>
        )}
      </div>
    );
  }
}

export default VisFarge;
