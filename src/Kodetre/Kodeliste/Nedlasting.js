import React from "react";
import Relasjon from "./Relasjon";
import { CloudDownload } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  button: {
    color: "rgba(0,0,0,0.5)",
    margin: 4
  },
  rightIcon: {
    marginLeft: 12
  }
});

const Nedlasting = props => {
  const classes = useStyles();
  return (
    <Relasjon {...props}>
      <div style={{ paddingLeft: 16, paddingBottom: 24 }}>
        <Button
          variant="contained"
          color="default"
          className={classes.button}
          onClick={() => {
            window.location = "https://data.artsdatabanken.no/" + props.url;
          }}
        >
          Last ned åpne data
          <CloudDownload className={classes.rightIcon} />
        </Button>
      </div>
    </Relasjon>
  );
};

export default Nedlasting;
