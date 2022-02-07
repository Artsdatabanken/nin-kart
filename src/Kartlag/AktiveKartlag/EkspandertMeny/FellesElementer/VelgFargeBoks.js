import React from "react";

class VelgFargeBoks extends React.Component {
  render() {
    const { farge, kode, setShowEditColor } = this.props;

    return (
      <div
        className="colour_legend"
        aria-label="Velg farge"
        style={{
          backgroundColor: farge,
          src: !farge && "/" + kode + ".png"
        }}
        onClick={e => {
          e.stopPropagation();
          setShowEditColor();
        }}
      />
    );
  }
}

export default VelgFargeBoks;
