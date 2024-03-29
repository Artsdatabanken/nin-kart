import { Switch } from "@material-ui/core";
import React from "react";
import { ArrowRight } from "@material-ui/icons";
import "../style/MenuElement.scss";

const Menyelement = ({
  primary,
  secondary,
  icon,
  onClick,
  toggle,
  checked,
  children,
  outgoing
}) => (
  <button onClick={onClick} className="hamburger_menu_item menu_item">
    <div className="button_items">
      <span>{icon}</span>
      <span className="primary_secondary">
        {primary} {secondary}
      </span>
    </div>

    <div className="mobile_only">
      <ArrowRight />
    </div>

    {toggle && <Switch checked={checked} />}
    {children}
    {outgoing}
  </button>
);
export default Menyelement;
