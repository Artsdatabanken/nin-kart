import React from "react";
import "../style/ToggleSwitch.scss";

const ToggleSwitch = ({ isActive, id }) => {
  return (
    <span className="toggle_switch">
      <label className="switch_list_element" htmlFor={id}>
        <input
          type="checkbox"
          className="toggle_switch_checkbox"
          name={`${id}-toggle`}
          id={id}
          checked={isActive}
          readOnly
        />
        <div className="slider_container toggle_switch">
          <span className="slider" />
        </div>
      </label>
    </span>
  );
};

export default ToggleSwitch;
