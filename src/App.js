import ResponsivtVindu from "./ResponsivtVindu";
import MainDrawer from "./MainDrawer/MainDrawer";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./style/App.css";
import "./style/Sidebar.css";
import "./style/GeografiskSidebar.css";
import "./style/Kartlag.css";
import "./style/FargeMenyer.css";
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
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter baseName={process.env.PUBLIC_URL}>
        <SettingsContainer>
          <ResponsivtVindu>
            <Grunnkart />
            <Informasjon />
            <MainDrawer />
          </ResponsivtVindu>
        </SettingsContainer>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;
