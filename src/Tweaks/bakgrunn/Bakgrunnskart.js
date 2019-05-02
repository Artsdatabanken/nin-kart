import SliderSetting from "../SliderSetting";
import { List, h3 } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";
import { Component, default as React } from "react";
import { withRouter } from "react-router";
import tinycolor from "tinycolor2";
import ColorPicker from "../ColorPicker";
import Bakgrunnskartlag from "./Bakgrunnskartlag";
import Tema from "./Tema";
import Terreng from "./Terreng";
import TemaPreview from "./TemaPreview";

class Bakgrunnskart extends Component {
  handleUpdateLayerProp = (lag, key, value) => {
    this.props.onUpdateLayerProp(
      lag,
      `kart.format.${this.props.kart.aktivtFormat}.${key}`,
      value
    );
  };

  render() {
    const { history, location } = this.props;
    const lag = location.pathname.substring(1);
    const { aktivtFormat } = this.props.kart;
    const kf = this.props.kart.format[aktivtFormat];
    if (location.search === "?vis_tema")
      return (
        <Tema
          onUpdateLayerProp={this.props.onUpdateLayerProp}
          valgt={aktivtFormat}
        />
      );
    if (location.search.startsWith("?vis_farge")) {
      const egenskap = location.search.split("=").pop();
      return (
        <List>
          <ColorPicker
            tittel={"Fyllfarge"}
            color={kf[egenskap + "_farge"]}
            onChange={farge => {
              const rgbString = tinycolor(farge.rgb).toRgbString();
              this.handleUpdateLayerProp(lag, egenskap + "_farge", rgbString);
            }}
          />
          {kf[egenskap + "_stroke_farge"] && (
            <>
              <h3>Omriss</h3>
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
            </>
          )}
        </List>
      );
    }

    return (
      <List>
        <div className="sidebar_element">
          <h3>Tema</h3>
          <TemaPreview type={aktivtFormat} />
          {false && (
            <Terreng
              kode="bakgrunnskart"
              terreng={this.props.terreng}
              onUpdateLayerProp={this.props.onUpdateLayerProp}
            />
          )}
        </div>
        <div className="sidebar_element">
          <h3>Områder</h3>
          <Bakgrunnskartlag
            onUpdateLayerProp={this.handleUpdateLayerProp}
            lagNavn="vann"
            tittel="Vann"
            erSynlig={kf.vann}
            farge={kf.vann_farge}
          />
          <Bakgrunnskartlag
            onUpdateLayerProp={this.handleUpdateLayerProp}
            lagNavn="land"
            tittel="Land"
            erSynlig={kf.land}
            farge={kf.land_farge}
          />
          <Bakgrunnskartlag
            onUpdateLayerProp={this.handleUpdateLayerProp}
            lagNavn="transport"
            tittel="Transport"
            erSynlig={kf.transport}
            farge={kf.transport_farge}
          />
        </div>
        <div className="sidebar_element">
          <h3>Etiketter</h3>
          <Bakgrunnskartlag
            onUpdateLayerProp={this.handleUpdateLayerProp}
            lagNavn="vann_navn"
            tittel="Vann"
            erSynlig={kf.vann_navn}
            farge={kf.vann_navn_farge}
          />
          <Bakgrunnskartlag
            onUpdateLayerProp={this.handleUpdateLayerProp}
            lagNavn="sted_navn"
            tittel="Steder"
            erSynlig={kf.sted_navn}
            farge={kf.sted_navn_farge}
          />
          <Bakgrunnskartlag
            onUpdateLayerProp={this.handleUpdateLayerProp}
            lagNavn="transport_navn"
            tittel="Transport"
            erSynlig={kf.transport_navn}
            farge={kf.transport_navn_farge}
          />
        </div>
        <div className="sidebar_element">
          <h3>Administrative grenser</h3>
          <Bakgrunnskartlag
            onUpdateLayerProp={this.handleUpdateLayerProp}
            lagNavn="landegrense"
            tittel="Riksgrense"
            erSynlig={kf.landegrense}
            farge={kf.landegrense_farge}
          />
          <Bakgrunnskartlag
            onUpdateLayerProp={this.handleUpdateLayerProp}
            lagNavn="fylkesgrense"
            tittel="Fylkesgrense"
            erSynlig={kf.fylkesgrense}
            farge={kf.fylkesgrense_farge}
          />
          <Bakgrunnskartlag
            onUpdateLayerProp={this.handleUpdateLayerProp}
            lagNavn="kommunegrense"
            tittel="Kommunegrense"
            erSynlig={kf.kommunegrense}
            farge={kf.kommunegrense_farge}
          />
        </div>
      </List>
    );
  }
}

export default withRouter(withTheme()(Bakgrunnskart));
