import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import config from "../Funksjoner/config";

const useStyles = makeStyles(() => ({
  heading: {
    marginLeft: 16,
    marginTop: 24,
    marginBottom: 8,
    color: "#777",
    fontWeight: 500,
  },
  subtekst: {
    marginBottom: 24,
  },
}));

const Overskrift = ({ tittel, image, subtekst }) => {
  const classes = useStyles();
  return (
    <>
      <div style={{}}>
        <Typography variant="h6" className={classes.heading}>
          <img
            src={config.logo(image)}
            style={{ position: "relative", top: 4, marginRight: 8 }}
            alt=""
          />
          {tittel}
        </Typography>
      </div>
      {false && (
        <Typography variant="body1" className={classes.subtext}>
          {subtekst}
        </Typography>
      )}
    </>
  );
};

export default Overskrift;
