import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  heading: {
    marginBottom: 16,
    color: "#777",
    fontWeight: "bold",
  },
  subtekst: {
    marginBottom: 24,
  },
}));

const Overskrift = ({ tittel, subtekst }) => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h5" className={classes.heading}>
        {tittel}
      </Typography>
      <Typography variant="body1" className={classes.subtext}>
        {subtekst}
      </Typography>
    </>
  );
};

export default Overskrift;
