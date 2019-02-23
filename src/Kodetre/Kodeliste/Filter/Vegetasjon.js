import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";

import typesystem from "@artsdatabanken/typesystem";
import { Typography } from "@material-ui/core";
import React, { Component } from "react";
import { EuroSymbol, Copyright } from "@material-ui/icons";
import Filter from "./Filter";

class Vegetasjon extends Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <Filter
        value={value}
        icons={[EuroSymbol, Copyright]}
        onChange={onChange}
        _marks={{ "30": "abc" }}
      >
        Vegetasjon
      </Filter>
    );
  }
}

export default Vegetasjon;
