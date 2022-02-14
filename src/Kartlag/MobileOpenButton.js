import React from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
const MobileOpenButton = ({ showKartlag, setShowKartlag, props }) => {
  let isPunkt =
    props.aktivTab === "punkt" || props.aktivTab === "kartlegging"
      ? "mobile_off"
      : "";

  return (
    <button
      className={
        showKartlag
          ? "mobile_slide_up_area open_mobile_slide_up_area " + isPunkt
          : "mobile_slide_up_area closed_mobile_slide_up_area " + isPunkt
      }
      onClick={() => {
        setShowKartlag();
      }}
    >
      {showKartlag ? (
        <KeyboardArrowDown />
      ) : (
        <>
          <KeyboardArrowUp />
          <span>Aktivt kartlag</span>
          <span> {props.tittel}</span>
        </>
      )}
    </button>
  );
};
export default MobileOpenButton;
