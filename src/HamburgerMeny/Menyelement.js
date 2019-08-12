import { Switch } from "@material-ui/core";
import React from "react";
import { ArrowRight } from "@material-ui/icons";

const Menyelement = ({
  primary,
  secondary,
  icon,
  onClick,
  toggle,
  checked
}) => (
  <button onClick={onClick} button className="hamburger_menu_item menu_item">
    <div>
      {icon}
      {primary}
      {secondary}
    </div>

    <div className="mobile_only">
      <ArrowRight />
    </div>

    {toggle && <Switch checked={checked} />}
  </button>
);
export default Menyelement;
