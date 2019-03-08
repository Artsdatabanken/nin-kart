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
      const { tittel, url, farge } = flagg[kode];
      console.log(flagg[kode]);
      const parts = kode.split("-");
      let avatarkode = parts.pop();
      if (avatarkode.length < 2) avatarkode = parts.pop();
      return (
        <Chip
          className={classes.chip}
          key={url}
          avatar={
            <Avatar style={{ backgroundColor: farge }}>
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
