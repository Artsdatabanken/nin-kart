import typesystem from "@artsdatabanken/typesystem";
import { withTheme } from "@material-ui/core/styles";
import { SwapVert } from "@material-ui/icons/";
import React, { Component } from "react";
import { withRouter } from "react-router";
import SliderElement from "Tweaks/FerdigeMiniElement/SliderElement";

class Gradient extends Component {
  render() {
    const { kode, onUpdateLayerProp, kart, måleenhet } = this.props;
    const gradient = kart.format.raster_gradient;
    const { filterMin, filterMax } = gradient;
    const [rangeMin, rangeMax] = gradient.intervall.original;
    const step = (rangeMax - rangeMin) / 1000;
    const decimals = Math.trunc(Math.log10(10000 / rangeMax));
    const spread = 0.015;
    return (
      <div className="sidebar_element">
        <h3>Filter</h3>
        <SliderElement
          value={filterMin}
          decimals={2}
          min={rangeMin}
          max={rangeMax}
          step={step}
          tittel="Minimum"
          undertittel={filterMin.toFixed(decimals) + " " + måleenhet}
          icon={<SwapVert />}
          onChange={v => {
            this.handleUpdateFilter(kode, "filterMin", v);
            if (filterMax <= filterMin + spread)
              onUpdateLayerProp(
                kode,
                "filterMax",
                Math.min(1.0, filterMin + spread)
              );
          }}
        />
        <SliderElement
          value={filterMax}
          decimals={2}
          min={rangeMin}
          max={rangeMax}
          step={step}
          tittel="Maksimum"
          undertittel={filterMax.toFixed(decimals) + " " + måleenhet}
          icon={<SwapVert />}
          onChange={v => {
            this.handleUpdateFilter(kode, "filterMax", v);
            if (filterMax <= filterMin + spread)
              this.handleUpdateFilter(
                kode,
                "filterMin",
                Math.max(0.0, filterMax - spread)
              );
          }}
        />
      </div>
    );
  }

  handleUpdateFilter = (kode, key, value) => {
    this.props.onUpdateLayerProp(
      kode,
      "kart.format.raster_gradient." + key,
      value
    );
  };

  navnPåUndernivå(kode) {
    const nivåer = typesystem.hentNivaa(kode + "-1");
    if (nivåer.length <= 0) return "underelementer";
    const nivå = nivåer[0];
    return nivå.endsWith("e") ? nivå + "r" : nivå;
  }
}

export default withRouter(withTheme(Gradient));
