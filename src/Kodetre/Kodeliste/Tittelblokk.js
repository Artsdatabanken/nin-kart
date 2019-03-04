import { Avatar, Chip, withStyles } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

const styles = {
  block: {
    padding: "16px 24px 20px"
  },
  h1: {
    marginTop: 0,
    marginBottom: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%"
  },
  nivå: {
    textTransform: "capitalize"
  }
};

const Tittelblokk = ({
  onToggleLayer,
  erAktivert,
  tittel,
  kode,
  farge,
  chipFarge,
  kontrastfarge,
  prefiks,
  nivå,
  overordnet,
  onNavigate,
  classes,
  theme,
  children
}) => {
  return (
    <React.Fragment>
      <div style={{ position: "relative", top: -72, right: -10 }} />
      <div
        className={classes.block}
        style={{
          position: "relative",
          backgroundColor: farge || "hsl(16, 0%, 50%)"
        }}
      >
        <Chip
          style={{
            backgroundColor: chipFarge,
            position: "absolute",
            top: -18,
            boxShadow:
              "0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)"
          }}
          label={kode.slice(3)}
          clickable={true}
          avatar={<Avatar>{kode.slice(0, 2)}</Avatar>}
        />
        <Typography
          variant="h6"
          className={classes.h1}
          style={{ color: kontrastfarge }}
          gutterBottom
        >
          {tittel}
        </Typography>
        <Typography style={{ color: kontrastfarge }} className={classes.nivå}>
          {nivå}
        </Typography>
        {children}
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles)(withTheme()(Tittelblokk));
