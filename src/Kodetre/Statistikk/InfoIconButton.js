import { IconButton } from "@material-ui/core";
import InfoOutline from "@material-ui/icons/InfoOutlined";
import React from "react";

const InfoIconButton = ({ href }) => {
  return (
    href && (
      <IconButton
        href={href}
        style={{
          display: "float",
          float: "right"
        }}
      >
        <InfoOutline />
      </IconButton>
    )
  );
};

export default InfoIconButton;
