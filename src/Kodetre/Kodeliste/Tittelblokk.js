import { Avatar, Chip } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";
import React from "react";
import SettingsContainer from "../../SettingsContainer";
import { SettingsContext } from "../../SettingsContext";
import { makeStyles } from "@material-ui/styles";
import prettyKode from "./prettyKode";

const useStyles = makeStyles({
  // This element contains exclusively the title elements!
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
  const pkode = prettyKode(kode).split(/-(.+)/);
  return (
    <SettingsContainer>
      <SettingsContext.Consumer>
        {context => (
          <div className="sidebar_title_container sidebar_element">
            {context.visKoder && (
              <div className="sidebar_code_bubble_container">
                {pkode[0] && (
                  <div className="sidebar_code_bubble_avatar">{pkode[0]}</div>
                )}
                {pkode[1] && (
                  <div className="sidebar_code_bubble">{pkode[1]}</div>
                )}
              </div>
            )}

            <h1 className="sidebar_title">{tittel}</h1>
            <h2 className={classes.nivå}>{nivå}</h2>
            {children}
          </div>
        )}
      </SettingsContext.Consumer>
    </SettingsContainer>
  );
};

export default withTheme()(Tittelblokk);
