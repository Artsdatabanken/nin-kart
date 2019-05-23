import React from "react";
import språk from "språk";
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
      <span className="kartlag_list_title">
        {språk(tittel)}
        <br />
        {context.visKoder && kode}
      </span>

      <span className="kartlag_list_icon_set">
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
