import typesystem from "@artsdatabanken/typesystem";
import {
  ListSubheader,
  ListItem,
  Divider,
  withStyles
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { withTheme } from "@material-ui/core/styles";
import { ZoomOutMap } from "@material-ui/icons/";
import ActionDelete from "@material-ui/icons/Delete";
import ActionInfo from "@material-ui/icons/Info";
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
    const {
      kode,
      url,
      history,
      bbox,
      onFitBounds,
      onRemoveSelectedLayer,
      kanSlettes,
      classes
    } = this.props;
    return (
      <React.Fragment>
        <ListSubheader>Filter</ListSubheader>
        <Divider style={{ marginTop: 24, marginBottom: 8 }} />
        <ListItem>
          {kanSlettes && (
            <Button
              color="primary"
              onClick={e => {
                onRemoveSelectedLayer(kode);
              }}
              icon={<ActionDelete />}
            >
              Fjern
            </Button>
          )}
          <Button
            color="primary"
            onClick={() => {
              history.push("/" + url);
            }}
            icon={<ActionInfo />}
          >
            Info
          </Button>
          {bbox && (
            <Button
              color="primary"
              onClick={() => {
                onFitBounds(bbox);
              }}
            >
              <ZoomOutMap className={classes.iconSmall} />
              Zoom til
            </Button>
          )}
        </ListItem>
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
