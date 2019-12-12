import { Avatar } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import config from "../Funksjoner/config";

const styles = {
  img: {
    objectFit: "contain",
    filter: "drop-shadow(1px 1px 1px #666)"
  },
  big: {},
  small: { width: 24, height: 24, fontSize: 13 },
  big_noborder: {
    borderRadius: 0,
    paddingBottom: 2
  },
  small_noborder: {
    borderRadius: 0,
    width: 24,
    height: 24,
    fontSize: 13,
    paddingBottom: 2
  }
};

class BildeAvatar extends Component {
  render() {
    const { classes, url } = this.props;
    const size = this.props.size || "big";
    return (
      <Avatar
        alt="logo"
        classes={{
          root: classes[size + "_noborder"],
          img: classes.img
        }}
        src={config.logo(url, 24)}
      />
    );
  }
}

export default withStyles(styles)(BildeAvatar);
