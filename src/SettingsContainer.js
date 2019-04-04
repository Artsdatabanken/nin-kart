import React, { Component } from "react";
import { SettingsContext } from "./SettingsContext";

class SettingsContainer extends Component {
  state = {
    visKoder: false,
    visAktiveLag: false,
    visHovedmeny: false,
    aktivTab: "meny"
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
          visHovedmeny: this.state.visHovedmeny,
          visKoder: this.state.visKoder,
          aktivTab: this.state.aktivTab,
          sorterPåKode: this.state.sorterPåKode,
          visAktiveLag: this.state.visAktiveLag,
          onUpdateValue: this.handleUpdateValue,
          onNavigateToTab: this.navigateToTab,
          onToggleAktiveLag: this.handleToggleAktivelag,
          onToggleHovedmeny: this.handleToggleHovedmeny,
          onToggleForside: this.handleToggleForside,
          onMapMove: this.handleMapMove
        }}
      >
        {this.props.children}
      </SettingsContext.Provider>
    );
  }

  navigateToTab = tab => {
    this.setState({ aktivTab: tab });
  };
  handleMapMove = () => {};
  handleUpdateValue = (key, value) => {
    this.setState({ [key]: value });
    localStorage.setItem(key, value);
  };

  handleToggleAktivelag = () =>
    this.handleUpdateValue("visAktiveLag", !this.state.visAktiveLag);

  handleToggleHovedmeny = () => {
    this.handleUpdateValue("visHovedmeny", !this.state.visHovedmeny);
  };
}

export default SettingsContainer;
