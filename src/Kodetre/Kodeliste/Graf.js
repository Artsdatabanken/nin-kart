import React from "react";
import Relasjon from "./Relasjon";

const Graf = ({ graf, opplyst, ...props }) => {
  if (!graf) return null;
  console.log("graf", opplyst);
  return graf.map(relasjon => {
    return (
      <Relasjon
        key={relasjon.type}
        heading={relasjon.type}
        noder={relasjon.noder}
        opplyst={{ a: "b", ...opplyst }}
        parentkode={props.parentkode}
        onNavigate={props.onNavigate}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        expand={props.expand}
        onSetExpand={props.onSetExpand}
        children={props.children}
      />
    );
  });
};

export default Graf;
