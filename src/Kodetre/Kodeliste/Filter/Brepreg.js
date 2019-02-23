import typesystem from "@artsdatabanken/typesystem";
import { Typography } from "@material-ui/core";
import React, { Component } from "react";
import { EuroSymbol, Copyright } from "@material-ui/icons";
import Filter from "./Filter";

class Brepreg extends Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <Filter
        value={value}
        icons={[EuroSymbol, Copyright]}
        onChange={onChange}
        marks={{ "30": "abc" }}
      >
        Brepreg
      </Filter>
    );
  }
}

export default Brepreg;
