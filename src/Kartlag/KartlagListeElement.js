import React from "react";
import { VisibilityOutlined, VisibilityOffOutlined } from "@material-ui/icons";
import språk from "../språk";

import { Layers, Close, KeyboardArrowDown } from "@material-ui/icons";

function KartlagListeElement(kartlag, props, visKoder) {
  const kode = kartlag.kode;
  let tittel = kartlag.tittel;
  let farge = kartlag.farge;
  const erSynlig = kartlag.erSynlig;
  const { onUpdateLayerProp, onRemoveSelectedLayer } = props;
  return (
    <li>
      <Layers className="kartlag_main_icon" />
      <span className="kartlag_list_title">
        {språk(tittel)}
        <span
          style={{
            color: farge
          }}
        >
          {" "}
          - {kode}
        </span>
      </span>
      <span className="kartlag_list_icon_set">
        <button className="invisible_icon_button">
          <KeyboardArrowDown />
        </button>

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

        <button className="invisible_icon_button">
          <Close onClick={() => onRemoveSelectedLayer(kode)} />
        </button>
      </span>
    </li>
  );
}

export default KartlagListeElement;
