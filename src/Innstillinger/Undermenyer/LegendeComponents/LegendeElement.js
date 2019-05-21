import React, { useState } from "react";
import VelgFargeBoks from "Innstillinger/FerdigeMiniElement/VelgFargeBoks";
import LegendeTitleField from "./LegendeTitleField";
import { VisibilityOutlined, VisibilityOffOutlined } from "@material-ui/icons";
import tinycolor from "tinycolor2";
import ColorPicker from "Innstillinger/FerdigeMiniElement/ColorPicker";
import språk from "språk";

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
      <button
        className="grouped_items_button"
        onClick={() => {
          setShowColours(!showColours);
        }}
        key={kode}
      >
        <LegendeTitleField tittel={språk(tittel)} undertittel={koder} />
        <VelgFargeBoks farge={farge} kode={kode} />
        {}
      </button>
      {
        <button
          className="invisible_icon_button show_hide_button"
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
      }
      {showColours && (
        <ColorPicker
          color={farge}
          onChange={farge => {
            const rgbString = tinycolor(farge.rgb).toRgbString();
            onUpdateLayerProp(kode, "farge", rgbString);
          }}
        />
      )}
    </div>
  );
};

export default LegendeElement;
