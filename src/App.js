import MainDrawer from "./MainDrawer/MainDrawer";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Grunnkart from "./Grunnkart/Grunnkart";
import Informasjon from "./Informasjon/Informasjon";
import SettingsContainer from "./SettingsContainer";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff9800"
    },
    secondary: {
      main: "#2196f3"
    }
  }
});

const App = () => {
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <SettingsContainer>
          <Grunnkart />
          <Informasjon />
          <MainDrawer
            erÅpen={context.visHovedmeny}
            toggleDrawer={context.onToggleHovedmeny}
            visKoder={context.visKoder}
            sorterPåKode={context.sorterPåKode}
            onUpdateSetting={context.onUpdateValue}
          />
        </SettingsContainer>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;
