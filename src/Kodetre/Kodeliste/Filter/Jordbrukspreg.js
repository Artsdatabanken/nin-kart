import typesystem from "@artsdatabanken/typesystem";
import { Typography } from "@material-ui/core";
import React, { Component } from "react";
import { Nature, LocationCity } from "@material-ui/icons";
import Filter from "./Filter";
import { EuroSymbol, Copyright } from "@material-ui/icons";

class Jordbrukspreg extends Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <Filter value={value} icons={[EuroSymbol, Copyright]} onChange={onChange}>
        Jordbrukspreg
      </Filter>
    );
  }
}

export default Jordbrukspreg;
