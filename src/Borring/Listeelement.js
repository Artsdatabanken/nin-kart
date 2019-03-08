import { Typography, Avatar, Divider, ListItem } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router";
import config from "../config";
import { palett } from "../farger";
import Flis from "../Kodetre/Kodeliste/Flis";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => {
  return {
    listitem: {
      color: "hsla(0, 0%, 0%, 0.55)"
    }
  };
};

const Listeelement = ({
  kode,
  primary,
  secondary,
  history,
  visKoder,
  onClick,
  classes
}) => {
  const prefix = kode.substring(0, 2);
  const bgFarge = palett.lysere[prefix];
  const avatar = false;
  return (
    <React.Fragment>
      <div
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          background:
            "linear-gradient(300deg, hsla(0, 0%, 100%, 0.05) -70%, " +
            bgFarge +
            ' 40%), url("' +
            config.getFotoBanner(prefix) +
            '")'
        }}
      >
        <ListItem button={true} onClick={onClick}>
          {avatar && (
            <Avatar
              style={{
                backgroundColor: "farger.mørk[prefix]",
                color: "black"
              }}
            >
              {prefix}
            </Avatar>
          )}
          <div className={classes.listitem}>
            <Typography variant="body1" color="inherit">
              {primary}
            </Typography>
            {secondary}
          </div>
          <div style={{ position: "absolute", right: 8, top: 8 }}>
            <Flis kode={kode} visKoder={visKoder} />
            __
          </div>
        </ListItem>
      </div>
      <Divider />
    </React.Fragment>
  );
};

export default withRouter(withStyles(styles)(Listeelement));
