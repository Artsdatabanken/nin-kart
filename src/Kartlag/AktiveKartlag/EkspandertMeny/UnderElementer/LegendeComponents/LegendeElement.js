import React, { useState } from "react";
import VelgFargeBoks from "../../FellesElementer/VelgFargeBoks";
import LegendeTitleField from "./LegendeTitleField";
import {
  VisibilityOutlined,
  VisibilityOffOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp
} from "@material-ui/icons";
import språk from "Funksjoner/språk";
import FargeVelger from "../../FellesElementer/FargeVelger";

const LegendeElement = ({
  erSynlig,
  tittel,
  koder,
  kode,
  onUpdateLayerProp,
  farge,
  elementType
}) => {
  const [showColours, setShowColours] = useState(false);

  /* 
  
  I denne filen er alle elementene man redigerer underelementer av det overstående elementet.
  Det vil si at å referere direkte herfra fort kan bli feil.
  Slenger derfor med variabelen "childof"
  
  */

  return (
    <div className="child_list_object">
      <div
        className="child_list_object_expand_header"
        onClick={e => {
          setShowColours(!showColours);
          e.stopPropagation();
        }}
      >
        <button
          className="invisible_icon_button"
          title={"Vis / skjul kartlaget " + språk(tittel)}
          onClick={e => {
            onUpdateLayerProp(kode, "erSynlig", !erSynlig, elementType);
            e.stopPropagation();
          }}
        >
          {erSynlig ? (
            <VisibilityOutlined />
          ) : (
            <VisibilityOffOutlined style={{ color: "#aaa" }} />
          )}
        </button>

        <LegendeTitleField tittel={språk(tittel)} undertittel={koder} />

        <button
          className="child_list_object_indicator"
          title={"Velg farge for " + språk(tittel).toLowerCase()}
        >
          <VelgFargeBoks farge={farge} kode={kode} tittel={språk(tittel)} />
          {showColours ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </button>
      </div>

      {showColours && (
        <FargeVelger
          color={farge}
          onUpdateLayerProp={onUpdateLayerProp}
          where={kode}
          elementType={elementType}
        />
      )}
    </div>
  );
};

export default LegendeElement;
