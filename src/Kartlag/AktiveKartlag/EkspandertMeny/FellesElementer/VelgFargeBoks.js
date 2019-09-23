import React from "react";

class VelgFargeBoks extends React.Component {
  render() {
    const { farge, kode, tittel } = this.props;

    return (
      <div
        className="colour_legend"
        title={
          !tittel ? "Velg farge" : "Velg farge for " + tittel.toLowerCase()
        }
        aria-label={"Velg farge"}
        style={{
          backgroundColor: farge,
          src: !farge && "/" + kode + ".png"
        }}
      />
    );
  }
}

export default VelgFargeBoks;
