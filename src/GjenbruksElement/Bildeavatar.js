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
    const urlWithNoQueryString =
      url &&
      "https://data.artsdatabanken.no/" + url.split("?")[0] + "/logo_24.png";

    return <img className="liste_ikon" alt="logo" src={urlWithNoQueryString} />;
  }
}

export default BildeAvatar;
