import typesystem from "@artsdatabanken/typesystem";
import { ListSubheader, withStyles } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";
import React, { Component } from "react";
import { withRouter } from "react-router";

const styles = {
  iconSmall: {
    fontSize: 20,
    marginRight: 8
  }
};

class Indexed extends Component {
  render() {
    return (
      <React.Fragment>
        <ListSubheader>Filter</ListSubheader>
      </React.Fragment>
    );
  }

  handleUpdateFilter = (kode, key, value) => {
    this.props.onUpdateLayerProp(
      kode,
      "kartformat.raster_gradient." + key,
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

export default withStyles(styles)(withRouter(withTheme()(Indexed)));
