import språk from "../../språk";
import React, { Component } from "react";
import { withStyles, Chip, Avatar } from "@material-ui/core";

const styles = {
  chip: {
    margin: 8
  }
};
class Flagg extends Component {
  render() {
    const { flagg, onNavigate, classes } = this.props;
    if (!flagg) return null;
    return Object.keys(flagg).map(kode => {
      const { tittel, url } = flagg[kode];
      const parts = kode.split("-");
      parts.pop();
      const avatarkode = parts.pop();
      return (
        <Chip
          className={classes.chip}
          key={url}
          avatar={
            <Avatar>
              {harBilde[avatarkode] ? (
                <img
                  alt="icon"
                  src={`https://data.artsdatabanken.no/${url}/icon.svg`}
                />
              ) : (
                avatarkode
              )}
            </Avatar>
          }
          label={språk(tittel)}
          onClick={() => onNavigate(url)}
        />
      );
    });
  }
}

const harBilde = { PF: 1, OF: 1 };

export default withStyles(styles)(Flagg);
