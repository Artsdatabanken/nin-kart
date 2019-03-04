import React, { Component } from "react";
import Gradient from "./LinearGauge";

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
        {Object.keys(gradient).map(type => {
          const gr = gradient[type];
          return (
            <Gradient
              key={type}
              tittel={type}
              url={gr.url}
              trinn={gr.trinn}
              onNavigate={onNavigate}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              opplystKode={opplystKode}
            />
          );
        })}
      </React.Fragment>
    );
  }
}

export default Gradienter;
