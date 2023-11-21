import React from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import getTitle from "../Funksjoner/getTitle";

const MobileOpenButton = ({ showKartlag, setShowKartlag, props }) => {
  let isPunkt =
    props.aktivTab === "punkt" || props.aktivTab === "kartlegging"
      ? "mobile_off"
      : "";
  let title = "";
  if (props.meta) title = getTitle(props.meta);
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
          <span> {title}</span>
        </>
      )}
    </button>
  );
};
export default MobileOpenButton;
