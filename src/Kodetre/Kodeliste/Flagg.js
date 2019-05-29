import språk from "Funksjoner/språk";
import React from "react";
import { Chip, Avatar } from "@material-ui/core";
import { kontrastfarge } from "Funksjoner/farger";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  chip: {
    margin: 8
  }
});

const Flagg = ({ flagg, onNavigate }) => {
  const classes = useStyles();
  if (!flagg) return null;
  return Object.keys(flagg).map(kode => {
    const { tittel, url, farge } = flagg[kode];
    const parts = kode.split("-");
    let avatarkode = parts.pop();
    if (avatarkode.length < 2) avatarkode = parts.pop();
    if (avatarkode.length === 4) avatarkode = avatarkode.substring(2);
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
              <span style={{ color: kontrastfarge(farge) }}>{avatarkode}</span>
            )}
          </Avatar>
        }
        label={språk(tittel)}
        onClick={() => onNavigate(url)}
      />
    );
  });
};

const harBilde = { PF: 1, OF: 1 };

export default Flagg;
