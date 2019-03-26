import typesystem from "@artsdatabanken/typesystem";
import { Typography, Avatar, Chip } from "@material-ui/core";
import React, { Component } from "react";
import config from "../../config";
import { palett } from "../../farger";

class Flis extends Component {
  render() {
    const { kode, visKoder } = this.props;
    const prefiks = kode.substring(0, 2);
    const parts = typesystem.splittKode(kode);
    if (prefiks === "AO" && parts.length > 1)
      return (
        <div style={{ paddingBottom: 4 }}>
          <img
            ref={el => (this.logo = el)}
            onLoad={() => {
              this.logo.style.opacity = 1;
            }}
            alt="logo"
            src={config.avatar40px(kode)}
            style={{
              opacity: 0,
              filter: "drop-shadow(2px 2px 2px #666)",
              animation: "fadein 3s ease"
            }}
          />
        </div>
      );
    if (!visKoder) return null;
    if (visKoder !== 42)
      return (
        <Typography>
          <div style={{ color: "rgba(0, 0, 0, 0.4)" }}>
            {kode.substring(3)}{" "}
          </div>
        </Typography>
      );
    return (
      <Chip
        style={{
          filter: "drop-shadow(2px 2px 2px #666)"
        }}
        avatar={
          <Avatar
            style={{
              backgroundColor: palett.medium[prefiks],
              color: "white"
            }}
          >
            {prefiks}
          </Avatar>
        }
        label={kode.substring(3)}
      />
    );
  }
}

export default Flis;
