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
  erAktivtLag,
  setExpanded,
  show_current,
  handleShowCurrent
}) => {
  let tittel = kartlag.tittel;
  const kode = kartlag.kode;
  const erSynlig = kartlag.erSynlig;
  if (tittel === "Basiskart") {
    tittel = "Bakgrunnskart";
  }

  return (
    <div
      className={
        (expanded && "kartlag_header kartlag_open_object") || "kartlag_header"
      }
    >
      {/* Name and codes of the layer */}
      <span className="kartlag_list_title">
        {språk(tittel) === "undefined" ? tittel.sn : språk(tittel)}
        <br />
        {context.visKoder && kode !== "bakgrunnskart" && kode}
      </span>

      {/* The span adjusts the menu to the right placement */}
      <span className="kartlag_list_icon_set">
        {/* This button is the eye button toggling this layer on and off */}
        <button
          className="invisible_icon_button"
          title={"Vis / skjul " + språk(tittel)}
          onClick={e => {
            if (!erAktivtLag) {
              onUpdateLayerProp(kode, "erSynlig", !erSynlig);
            } else {
              handleShowCurrent(!show_current);
            }
          }}
        >
          {erAktivtLag ? (
            <>
              {show_current ? (
                <VisibilityOutlined />
              ) : (
                <VisibilityOffOutlined style={{ color: "#aaa" }} />
              )}
            </>
          ) : (
            <>
              {erSynlig ? (
                <VisibilityOutlined />
              ) : (
                <VisibilityOffOutlined style={{ color: "#aaa" }} />
              )}
            </>
          )}
        </button>

        {/* The toggle button for this element */}
        <button
          className="invisible_icon_button"
          title={"Velg innstillinger for " + språk(tittel)}
          aria-label={"Velg innstillinger for " + språk(tittel)}
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

export default EkspanderingsTopplinje;
