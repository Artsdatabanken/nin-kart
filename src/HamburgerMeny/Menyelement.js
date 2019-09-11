import { Switch } from "@material-ui/core";
import React from "react";
import { ArrowRight } from "@material-ui/icons";

const Menyelement = ({
  primary,
  secondary,
  icon,
  onClick,
  toggle,
  checked,
  children
}) => (
  <button onClick={onClick} className="hamburger_menu_item menu_item">
    <div className="button_items">
      <span>{icon}</span>
      <span>
        {primary} {secondary}
      </span>
    </div>

    <div className="mobile_only">
      <ArrowRight />
    </div>

    {toggle && <Switch checked={checked} />}
    {children}
  </button>
);
export default Menyelement;
