import React from "react";
import Navigeringsliste from "Navigering/Navigeringsliste/Navigeringsliste";
import Ekspander from "GjenbruksElement/Ekspander";
import { titler } from "./Titler";

const Relasjon = props => {
  const {
    heading,
    noder,
    parentkode,
    onNavigate,
    onMouseEnter,
    onMouseLeave,
    opplyst,
    children
  } = props;
  // console.log(props);
  const count = noder ? noder.length : 1;
  const x = titler[heading] || { title: heading };
  // console.log("rela", parentkode, opplyst);
  return (
    <Ekspander
      visible={count > 0}
      heading={x.title || heading}
      heading2={count}
    >
      {noder && (
        <Navigeringsliste
          parentkode={parentkode}
          onNavigate={onNavigate}
          title=""
          subtitle={x.subtitle}
          metadata={noder}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          opplyst={opplyst}
        />
      )}
      {children}
    </Ekspander>
  );
};

export default Relasjon;
