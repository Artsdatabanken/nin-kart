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
  const pkode = prettyKode(kode);
  return (
    <SettingsContainer>
      <SettingsContext.Consumer>
        {context => (
          <div className="sidebar_title_container sidebar_element">
            <h1 className="sidebar_title">{tittel}</h1>
            <h2 className={classes.nivå}>
              {nivå}
              {context.visKoder && (
                <span className="sidebar_code_field">
                  {pkode && <span className=""> - {pkode}</span>}
                </span>
              )}
            </h2>
            {children}
          </div>
        )}
      </SettingsContext.Consumer>
    </SettingsContainer>
  );
};

export default withTheme()(Tittelblokk);
