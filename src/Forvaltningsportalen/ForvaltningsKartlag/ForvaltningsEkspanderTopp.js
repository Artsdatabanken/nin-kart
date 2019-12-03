import React, { useState } from "react";
import språk from "Funksjoner/språk";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import { FormControlLabel, Checkbox } from "@material-ui/core";

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
      <FormControlLabel
        control={
          <Checkbox
            checked={erSynlig}
            onChange={e => {
              if (!erAktivtLag) {
                onUpdateLayerProp(kode, "erSynlig", !erSynlig);
                e.stopPropagation();
              } else {
                handleShowCurrent(!show_current);
              }
            }}
            value="checkedA"
            inputProps={{
              "aria-label": "primary checkbox"
            }}
          />
        }
        label={språk(tittel)}
        labelPlacement="end"
      ></FormControlLabel>
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
