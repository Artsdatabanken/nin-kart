import SvgIcon from "@material-ui/core/SvgIcon";
import React from "react";

const OpenData = props => {
  return (
    <SvgIcon>
      <circle cx="12" cy="12" r="10" _fill="red" />
      <circle cx="12" cy="12" r="4" fill="white" />
      <polygon points="12,12 17,24 7,24" fill="white" />
    </SvgIcon>
  );
};

export default OpenData;
