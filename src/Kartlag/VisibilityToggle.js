import React from "react";
import { IconButton } from "@material-ui/core";
import { VisibilityOutlined, VisibilityOffOutlined } from "@material-ui/icons";

const VisibilityToggle = ({ kode, erSynlig, onClick }) => (
  <IconButton onClick={onClick}>
    {erSynlig ? (
      <VisibilityOutlined style={{ color: "#333" }} />
    ) : (
      <VisibilityOffOutlined style={{ color: "#aaa" }} />
    )}
  </IconButton>
);

export default VisibilityToggle;
