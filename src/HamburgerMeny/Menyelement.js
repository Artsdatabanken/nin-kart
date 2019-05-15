import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch
} from "@material-ui/core";
import React from "react";

const Menyelement = ({
  primary,
  secondary,
  icon,
  onClick,
  toggle,
  checked
}) => (
  <ListItem onClick={onClick} button>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={primary} secondary={secondary} />
    {toggle && <Switch checked={checked} />}
  </ListItem>
);
export default Menyelement;
