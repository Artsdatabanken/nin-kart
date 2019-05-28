import React from "react";
import språk from "Funksjoner/språk";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  VisibilityOutlined,
  VisibilityOffOutlined
} from "@material-ui/icons";

const EkspanderingsTopplinje = ({
  context,
  onUpdateLayerProp,
  expanded,
  kartlag,
  closeAll,
  setExpanded
}) => {
  const tittel = kartlag.tittel;
  const kode = kartlag.kode;
  const erSynlig = kartlag.erSynlig;
  return (
    <div
      className={
        (expanded && "kartlag_header kartlag_open_object") || "kartlag_header"
      }
    >
      {/* Name and codes of the layer */}
      <span className="kartlag_list_title">
        {språk(tittel)}
        <br />
        {context.visKoder && kode}
      </span>

      {/* The span adjusts the menu to the right placement */}
      <span className="kartlag_list_icon_set">
        {/* This button is the eye button toggling this layer on and off */}
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

        {/* The toggle button for this element */}
        <button
          className="invisible_icon_button"
          onClick={() => {
            setExpanded(!expanded);
            closeAll();
          }}
        >
          {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}{" "}
        </button>
      </span>
    </div>
  );
};

export default EkspanderingsTopplinje;
