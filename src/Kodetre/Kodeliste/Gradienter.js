import React, { Component } from "react";
import { ListSubheader } from "@material-ui/core";
import LinearGauge from "./LinearGauge";

class Gradienter extends Component {
  render() {
    const {
      gradient,
      onNavigate,
      onMouseEnter,
      onMouseLeave,
      opplystKode
    } = this.props;
    if (!gradient) return null;
    return (
      <React.Fragment>
        <ListSubheader>defineres av</ListSubheader>
        {Object.keys(gradient).map(type => {
          const gr = gradient[type];
          return (
            <div key={type}>
              <LinearGauge
                tittel={type}
                url={gr.url}
                trinn={gr.trinn}
                onNavigate={onNavigate}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                opplystKode={opplystKode}
              />
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}

export default Gradienter;
