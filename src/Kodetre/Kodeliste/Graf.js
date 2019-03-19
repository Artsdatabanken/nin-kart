import React from "react";
import Relasjon from "./Relasjon";

const Graf = ({ graf, ...props }) => {
  if (!graf) return null;
  return graf.map(relasjon => {
    return (
      <Relasjon
        key={relasjon.type}
        heading={relasjon.type}
        noder={relasjon.noder}
        {...props}
      />
    );
  });
};

export default Graf;
