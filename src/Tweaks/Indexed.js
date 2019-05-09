import typesystem from "@artsdatabanken/typesystem";
import { ListSubheader } from "@material-ui/core";
import React, { Component } from "react";
import { withRouter } from "react-router";

class Indexed extends Component {
  render() {
    return (
      <>
        <ListSubheader>Filter</ListSubheader>
      </>
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

export default withRouter(Indexed);
