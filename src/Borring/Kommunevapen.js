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
        src={config.getFotoOmslag(url, 408, "jpg")}
        style={{
          opacity: 0,
          width: 56,
          filter: "drop-shadow(3px 3px 2px #444)",
          animation: "fadein 0.6s ease"
        }}
      />
    );
  }
}

export default Kommunevapen;
