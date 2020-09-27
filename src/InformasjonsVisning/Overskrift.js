import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Typography } from "@material-ui/core";
import config from "../Funksjoner/config";
import { InfoOutlined } from "@material-ui/icons";

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

const Overskrift = ({ tittel, image, subtekst, onClickInfo }) => {
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
          {onClickInfo && (
            <IconButton style={{}} onClick={onClickInfo}>
              <InfoOutlined style={{ color: "#777" }} />
            </IconButton>
          )}
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
