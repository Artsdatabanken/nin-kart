import { ListSubheader } from "@material-ui/core";
import React, { Component } from "react";
import VizType from "./VizType";

class Generelt extends Component {
  render() {
    const {
      children,
      kartformat,
      aktivtKartformat,
      kode,
      search,
      onUpdateLayerProp
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
              kartformat={kartformat}
              aktivtKartformat={aktivtKartformat}
            />
            <div style={{ fontSize: 12, paddingTop: 8, paddingLeft: 44 }}>
              Kommer mer fornuftige valg her...
            </div>
          </React.Fragment>
        )}
        {children}
      </div>
    );
  }
}

export default Generelt;
