import React from "react";

const VelgFargeBoks = ({ farge, kode }) => {
  return (
    <div
      className="colour_legend"
      aria-label="Velg farge"
      style={{
        backgroundColor: farge,
        src: !farge && "/" + kode + ".png"
      }}
    />
  );
};

export default VelgFargeBoks;
