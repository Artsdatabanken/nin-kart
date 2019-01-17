import { Avatar, Chip, withStyles } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import farger from "../../farger";
import Tagger from "./Tagger";

const styles = {
  block: {
    padding: "16px 24px 20px"
  },
  h1: {
    color: "#eee",
    marginTop: 0,
    marginBottom: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%"
  },
  nivå: {
    color: "#eee",
    textTransform: "capitalize"
  }
};

const Tittelblokk = ({
  onToggleLayer,
  erAktivert,
  tittel,
  kode,
  prefiks,
  nivå,
  overordnet,
  onNavigate,
  classes,
  theme,
  children
}) => {
  return (
    <div
      className={classes.block}
      style={{ backgroundColor: farger.mørk[prefiks] || "hsl(16, 0%, 50%)" }}
    >
      {false && (
        <div
          style={{ position: "relative", top: -72, right: -10, float: "right" }}
        >
          <Chip
            label={kode.slice(3) + " " + tittel}
            clickable={true}
            avatar={<Avatar>{kode.slice(0, 2)}</Avatar>}
          />
          <div className={classes.h1}>{tittel}</div>
        </div>
      )}
      <Typography variant="h6" className={classes.h1} gutterBottom>
        {tittel}
      </Typography>
      <Typography className={classes.nivå}>{nivå}</Typography>
      <Tagger overordnet={overordnet} onNavigate={onNavigate} />
      {children}
    </div>
  );
};

export default withStyles(styles)(withTheme()(Tittelblokk));
