import { Switch } from "@material-ui/core";
import React from "react";

const Menyelement = ({
  primary,
  secondary,
  icon,
  onClick,
  toggle,
  checked
}) => (
  <button onClick={onClick} button className="hamburger_menu_item menu_item">
    <div>{icon}</div>
    <div>
      {primary}
      {secondary}{" "}
    </div>
    {toggle && <Switch checked={checked} />}
  </button>
);
export default Menyelement;
