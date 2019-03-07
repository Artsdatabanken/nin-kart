import { Avatar, Chip } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import SettingsContainer from "../../SettingsContainer";
import { SettingsContext } from "../../SettingsContext";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
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
  },
  chip: {
    position: "absolute",
    top: -18,
    right: 24,
    boxShadow:
      "0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)",
    avatar: { backgroundColor: "blue" },
    icon: { backgroundColor: "green" }
  }
});

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
  theme,
  children
}) => {
  const classes = useStyles();
  return (
    <SettingsContainer>
      <SettingsContext.Consumer>
        {context => (
          <div
            className={classes.block}
            style={{
              position: "relative",
              backgroundColor: farge || "hsl(16, 0%, 50%)"
            }}
          >
            {context.visKoder && (
              <Chip
                className={classes.chip}
                style={{
                  backgroundColor: chipFarge
                }}
                label={kode.slice(3)}
                clickable={true}
                avatar={
                  <Avatar
                    style={{
                      backgroundColor: farge
                    }}
                  >
                    {kode.slice(0, 2)}
                  </Avatar>
                }
              />
            )}
            <Typography
              variant="h6"
              className={classes.h1}
              style={{ color: kontrastfarge }}
              gutterBottom
            >
              {tittel}
            </Typography>
            <Typography
              style={{ color: kontrastfarge }}
              className={classes.nivå}
            >
              {nivå}
            </Typography>
            {children}
          </div>
        )}
      </SettingsContext.Consumer>
    </SettingsContainer>
  );
};

export default withTheme()(Tittelblokk);
