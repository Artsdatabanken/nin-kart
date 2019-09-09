import React from "react";

class VelgFargeBoks extends React.Component {
  render() {
    const { farge, kode } = this.props;
    return (
      <div
        className="colour_legend"
        title={"Velg farge"}
        style={{
          backgroundColor: farge,
          src: !farge && "/" + kode + ".png"
        }}
      />
    );
  }
}

export default VelgFargeBoks;
