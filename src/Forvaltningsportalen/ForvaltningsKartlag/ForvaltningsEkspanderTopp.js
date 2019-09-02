import React, { useState } from "react";
import språk from "Funksjoner/språk";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";

const ForvaltningsEkspanderTopp = ({
  kartlag,
  erAktivtLag,
  onUpdateLayerProp,
  handleShowCurrent,
  show_current
}) => {
  let tittel = kartlag.tittel;
  const kode = kartlag.kode;
  const erSynlig = kartlag.erSynlig;

  const [expanded, setExpanded] = useState(false);
  return (
    <div className="kartlag_header">
      <input
        type="checkbox"
        className="invisible_icon_button"
        onClick={e => {
          if (!erAktivtLag) {
            onUpdateLayerProp(kode, "erSynlig", !erSynlig);
            e.stopPropagation();
          } else {
            handleShowCurrent(!show_current);
          }
        }}
        checked={erSynlig ? "checked" : ""}
      />
      <span className="kartlag_list_title">
        {språk(tittel)}
        <br />
      </span>

      <span className="kartlag_list_icon_set">
        {/* The toggle button for this element */}
        <button
          className="invisible_icon_button"
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}{" "}
        </button>
      </span>
    </div>
  );
};

export default ForvaltningsEkspanderTopp;
