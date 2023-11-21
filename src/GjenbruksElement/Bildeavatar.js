import React, { Component } from "react";
import config from "../Funksjoner/config";

class BildeAvatar extends Component {
  /*
    Primarily used to display avatars of searchable content, such as logos in the search menu
  And also in the sidebar display box header thing

  For changes, make sure to test:
  - result list from the search
  - hamburger menu
  - "kodeliste"

  */
  render() {
    const { url } = this.props;
    if (!url) return null;
    let classes = "liste_ikon";
    return (
      <span className="liste_ikon_container">
        <img
          className={classes}
          alt="logo"
          src={config.logo(url.split("?")[0])}
        />
      </span>
    );
  }
}

export default BildeAvatar;
