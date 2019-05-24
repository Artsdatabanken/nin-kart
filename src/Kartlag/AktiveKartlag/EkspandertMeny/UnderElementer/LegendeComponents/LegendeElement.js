import React, { useState } from "react";
import VelgFargeBoks from "../../FellesElementer/VelgFargeBoks";
import LegendeTitleField from "./LegendeTitleField";
import {
  VisibilityOutlined,
  VisibilityOffOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp
} from "@material-ui/icons";
import språk from "språk";
import FargeVelger from "../../FellesElementer/FargeVelger";

const LegendeElement = ({
  erSynlig,
  tittel,
  koder,
  kode,
  onUpdateLayerProp,
  farge
}) => {
  const [showColours, setShowColours] = useState(false);
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
          onClick={e => {
            onUpdateLayerProp(kode, "erSynlig", !erSynlig);
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

        <div className="child_list_object_indicator">
          <VelgFargeBoks farge={farge} kode={kode} />
          {showColours ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </div>
      </div>

      {showColours && (
        <FargeVelger
          color={farge}
          onUpdateLayerProp={onUpdateLayerProp}
          where={kode}
        />
      )}
    </div>
  );
};

export default LegendeElement;
