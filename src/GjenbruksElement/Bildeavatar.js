import { Avatar } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import config from "Funksjoner/config";

const styles = {
  img: {
    width: 24,
    height: 24,
    position: "relative",
    objectFit: "contain",
    filter: "drop-shadow(1px 1px 2px #999)"
  },
  big: {},
  root: {
    display: "contents",
    borderRadius: 0
  }
};

// Primarily used to display avatars of searchable content, such as logos in the search menu
// And also in the sidebar display box header thing
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
    const { classes, url } = this.props;
    return (
      <Avatar
        alt="logo"
        classes={{
          root: classes.root,
          img: classes.img
        }}
        src={"https://data.artsdatabanken.no/" + url + "/logo_24.png"}
      />
    );
  }
}

export default withStyles(styles)(BildeAvatar);
