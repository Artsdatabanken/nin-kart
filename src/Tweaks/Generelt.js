import { Delete, InfoOutlined, ZoomOutMap } from "@material-ui/icons/";
import {
  Divider,
  ListItem,
  Button,
  ListSubheader,
  withStyles
} from "@material-ui/core";
import React, { Component } from "react";
import VizType from "./VizType";

const styles = {
  iconSmall: {
    fontSize: 20,
    marginRight: 8
  }
};

class Generelt extends Component {
  render() {
    const {
      children,
      kart,
      kode,
      url,
      kanSlettes,
      onRemoveSelectedLayer,
      onFitBounds,
      bbox,
      search,
      history,
      onUpdateLayerProp,
      classes
    } = this.props;
    return (
      <div>
        <div style={{ marginLeft: 24 }} />
        {search === "?vis" && (
          <React.Fragment>
            <ListSubheader>Visualisering</ListSubheader>
            <VizType
              lag={kode}
              onUpdateLayerProp={onUpdateLayerProp}
              format={kart.format}
              aktivtFormat={kart.aktivtFormat}
            />
            <div style={{ fontSize: 12, paddingTop: 8, paddingLeft: 44 }}>
              Kommer mer fornuftige valg her...
            </div>
          </React.Fragment>
        )}
        {children}
        <Divider style={{ marginTop: 24, marginBottom: 8 }} />
        <ListItem>
          {kanSlettes && (
            <Button
              color="primary"
              onClick={e => {
                onRemoveSelectedLayer(kode);
              }}
              icon={<Delete />}
            >
              Fjern
            </Button>
          )}
          <Button
            color="primary"
            onClick={() => {
              history.push("/" + url);
            }}
          >
            <InfoOutlined className={classes.iconSmall} />
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
      </div>
    );
  }
}

export default withStyles(styles)(Generelt);
