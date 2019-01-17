import { withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";
import språk from "../../språk";

const styles = {
  typo: { color: "#fff" },
  link: { cursor: "pointer" }
};

const Tagger = ({ overordnet, onNavigate, classes }) => {
  if (!overordnet) return null;
  const r = overordnet.map(forelder => (
    <React.Fragment key={forelder.kode}>
      {forelder.kode.length > 1 && <span>&nbsp;»&nbsp;</span>}
      <span
        className={classes.link}
        onClick={e => {
          e.stopPropagation();
          onNavigate(forelder.url);
        }}
      >
        {språk(forelder.tittel)}
      </span>
    </React.Fragment>
  ));
  return (
    <Typography className={classes.typo} variant="body2">
      {r.reverse()}
    </Typography>
  );
};

export default withStyles(styles)(Tagger);
