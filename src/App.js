import { SettingsContext } from "./SettingsContext";
import MainDrawer from "./MainDrawer/MainDrawer";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Grunnkart from "./Grunnkart/Grunnkart";
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

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <SettingsContainer>
            <Grunnkart />
            <SettingsContext.Consumer>
              {context => (
                <MainDrawer
                  erÅpen={context.visHovedmeny}
                  toggleDrawer={context.onToggleHovedmeny}
                  visKoder={context.visKoder}
                  sorterPåKode={context.sorterPåKode}
                  onUpdateSetting={context.onUpdateValue}
                />
              )}
            </SettingsContext.Consumer>
          </SettingsContainer>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
