import React from "react";

class VelgFargeBoks extends React.Component {
  render() {
    const { farge, kode, tittel } = this.props;

    return (
      <div
        className="colour_legend"
        title={"Velg farge for " + tittel.toLowerCase()}
        style={{
          backgroundColor: farge,
          src: !farge && "/" + kode + ".png"
        }}
      />
    );
  }
}

export default VelgFargeBoks;
