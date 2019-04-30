import React, { useState } from "react";
import { VisibilityOutlined, VisibilityOffOutlined } from "@material-ui/icons";
import språk from "../språk";

import {
  Layers,
  Close,
  KeyboardArrowDown,
  KeyboardArrowUp,
  OpenInNew,
  ColorLens
} from "@material-ui/icons";

function KartlagListeElement({ kartlag, props, visKoder }) {
  const [expanded, setExpanded] = useState(false);
  const kode = kartlag.kode;
  let tittel = kartlag.tittel;
  //let farge = kartlag.farge;
  const erSynlig = kartlag.erSynlig;
  const { onUpdateLayerProp, onRemoveSelectedLayer, bbox, onFitBounds } = props;

  return (
    <li>
      <div className="kartlag_header">
        <Layers className="kartlag_main_icon" />
        <span className="kartlag_list_title">
          {språk(tittel)}
          {kode}
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
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <KeyboardArrowDown /> : <KeyboardArrowUp />}{" "}
          </button>
        </span>
      </div>
      <div className="kartlag_submeny">
        <button
          className="invisible_icon_button"
          onClick={() => onFitBounds(bbox)}
        >
          <OpenInNew />
        </button>
        <button className="invisible_icon_button">
          <ColorLens />
        </button>
        <button className="invisible_icon_button">
          <Close onClick={() => onRemoveSelectedLayer(kode)} />
        </button>
      </div>
    </li>
  );
}

export default KartlagListeElement;
