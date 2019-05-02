import React, { useState } from "react";
import { VisibilityOutlined, VisibilityOffOutlined } from "@material-ui/icons";
import språk from "../språk";

import { SettingsContext } from "../SettingsContext";
import {
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
  let bbox = kartlag.bbox;
  //let farge = kartlag.farge;
  const erSynlig = kartlag.erSynlig;
  const {
    onUpdateLayerProp,
    onRemoveSelectedLayer,
    history,
    onMouseLeave,
    onFitBounds
  } = props;

  return (
    <li>
      <div
        className={
          (expanded && "kartlag_header kartlag_open_object") || "kartlag_header"
        }
      >
        <span className="kartlag_list_title">
          {språk(tittel)}
          <br />
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
            {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}{" "}
          </button>
        </span>
      </div>
      {expanded && (
        <div className="kartlag_submeny">
          <SettingsContext.Consumer>
            {context => (
              <button className="invisible_icon_button">
                Farger{" "}
                <ColorLens
                  onClick={() => {
                    onMouseLeave();
                    history.push("/" + kode + "?vis");
                  }}
                />
              </button>
            )}
          </SettingsContext.Consumer>
          {kode !== "bakgrunnskart" && (
            <>
              <button
                className="invisible_icon_button"
                onClick={() => onFitBounds(bbox)}
              >
                Zoom til <OpenInNew />
              </button>
              <button
                className="invisible_icon_button remove_icon"
                onClick={() => onRemoveSelectedLayer(kode)}
              >
                Fjern <Close />
              </button>
            </>
          )}
        </div>
      )}
    </li>
  );
}

export default KartlagListeElement;
