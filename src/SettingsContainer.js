import React, { Component } from "react";
import { SettingsContext } from "./SettingsContext";

class SettingsContainer extends Component {
  state = {
    visKoder: false,
    visHovedmeny: false,

    width: window.innerWidth
  };

  componentDidMount() {
    this.setState({
      visKoder: localStorage.getItem("visKoder") === "true",
      sorterPåKode: localStorage.getItem("sorterPåKode") === "true"
    });
  }

  render() {
    return (
      <SettingsContext.Provider
        value={{
          visKoder: this.state.visKoder,
          sorterPåKode: this.state.sorterPåKode,
          width: this.state.width,
          onUpdateValue: this.handleUpdateValue,
          onToggleForside: this.handleToggleForside,
          onMapMove: this.handleMapMove,
          onSetWidth: this.setWidth
        }}
      >
        {this.props.children}
      </SettingsContext.Provider>
    );
  }

  handleMapMove = () => {};
  handleUpdateValue = (key, value) => {
    this.setState({ [key]: value });
    localStorage.setItem(key, value);
  };

  setWidth = width => {
    this.setState({ width });
  };
}

export default SettingsContainer;
