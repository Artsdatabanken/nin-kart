import React, { Component } from "react";
import config from "../config";

class Kommunevapen extends Component {
  render() {
    const { url } = this.props;
    return (
      <img
        ref={el => (this.logo = el)}
        onLoad={() => {
          this.logo.style.opacity = 1;
        }}
        alt="kommunevåpen"
        src={config.logo(url, 48)}
        style={{
          objectFit: "contain",
          opacity: 0,
          width: 48,
          height: 48,
          filter: "drop-shadow(3px 3px 2px #888)",
          animation: "fadein 0.6s ease"
        }}
      />
    );
  }
}

export default Kommunevapen;
