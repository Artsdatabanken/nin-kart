import React from "react";

const VelgFargeBoks = ({ farge, kode, showEditColor, setShowEditColor }) => {
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
        setShowEditColor(!showEditColor);
      }}
    />
  );
};

export default VelgFargeBoks;
