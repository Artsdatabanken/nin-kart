import { withTheme } from "@material-ui/core/styles";
import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

const Innstilling = ({
  tittel,
  undertittel,
  verdi,
  icon,
  disabled,
  children,
  theme
}) => (
  <ListItem disabled={disabled}>
    {verdi && (
      <div
        style={{
          fontFamily: theme.typography.fontFamily,
          position: "absolute",
          right: 20,
          top: 10,
          color: theme.palette.text.disabled
        }}
      >
        {verdi}
      </div>
    )}
    {icon && <ListItemIcon>{icon}</ListItemIcon>}
    {false && <ListItemText primary={tittel} secondary={undertittel} />}
    <div style={{ paddingLeft: 8, paddingRight: 8, width: "100%" }}>
      <div>{tittel}</div>
      <div>{undertittel}</div>
    </div>
    {children}
  </ListItem>
);

export default withTheme()(Innstilling);
