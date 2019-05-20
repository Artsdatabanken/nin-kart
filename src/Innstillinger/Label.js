import { withTheme } from "@material-ui/core/styles";
import React from "react";

const Label = ({ children, style, disabled, theme }) => (
  <div
    style={{
      position: "absolute",
      float: "left",
      left: 56,
      fontFamily: theme.typography.fontFamily,
      fontSize: 16,
      fontWeight: 400,
      color: disabled
        ? theme.palette.text.disabled
        : theme.palette.text.primary,
      ...style
    }}
  >
    {children}
  </div>
);

export default withTheme()(Label);
