import React, { Component } from "react";

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
    let urlWithNoQueryString =
      url &&
      "https://data.artsdatabanken.no/" + url.split("?")[0] + "/logo_24.png";
    let classes = "liste_ikon";
    if (urlWithNoQueryString.includes("Biota")) {
      urlWithNoQueryString = urlWithNoQueryString.replace(
        "logo_24",
        "phylopic_48"
      );
      classes += " external_icons";
    }
    return (
      <span className="liste_ikon_container">
        <img className={classes} alt="logo" src={urlWithNoQueryString} />
      </span>
    );
  }
}

export default BildeAvatar;
