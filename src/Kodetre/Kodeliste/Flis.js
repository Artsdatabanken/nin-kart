import { Avatar, Chip } from "@material-ui/core";
import React, { Component } from "react";
import { palett } from "Funksjoner/farger";

class Flis extends Component {
  render() {
    const { kode, visKoder } = this.props;
    const prefiks = kode.substring(0, 2);
    if (!visKoder) return null;
    if (visKoder !== 42)
      return <div className="kode_flis_tekst">{kode.substring(3)} </div>;
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
