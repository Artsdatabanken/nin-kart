import React from "react";
import Navigeringsliste from "../../../Kartlag/CurrentElement/Navigeringsliste/Navigeringsliste";
import SectionExpand from "../../../GjenbruksElement/SectionExpand";
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
  const count = noder ? noder.length : 1;
  const x = titler[heading] || { title: heading };
  // eksempelside: /Natur_i_Norge/Natursystem/Typeinndeling/Marine_vannmasser
  if (!(count > 0)) return null;
  return (
    <div className="subsection">
      <h4>Relasjoner</h4>
      <SectionExpand
        title={
          <span>
            {x.title || heading} - {count}
          </span>
        }
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
      </SectionExpand>
    </div>
  );
};

export default Relasjon;
