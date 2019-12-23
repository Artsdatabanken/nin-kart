import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as Sentry from "@sentry/browser";
import { BrowserRouter } from "react-router-dom";
import SettingsContainer from "SettingsContainer";
true &&
  Sentry.init({
    dsn: "https://c493d02267634ba4bc387feaddbeb083@sentry.io/1302262",
    maxBreadcrumbs: 50,
    debug: true
  });

class RootBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Sentry.configureScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
    });
    Sentry.captureException(error);
  }

  render() {
    if (this.state.error) {
      //render fallback UI
      return (
        <a href="./" onClick={() => Sentry.showReportDialog()}>
          Report feedback
        </a>
      );
    } else {
      return this.props.children;
    }
  }
}

const theme = createMuiTheme({
  palette: {
    primary: { main: "#ddd" },
    secondary: { main: "#2a2" }
  },
  status: {
    danger: "orange"
  }
});

var string = `
<div style="max-width:50%;margin:auto;">
<h1>Forvaltningsportal Økologisk grunnkart</h1>
  <p>Du har forsøkt å åpne siden i nettlesereren Internet Explorer, en nettleser vi har valgt å ikke støtte.</p>
  <p> Hvis du ønsker å benytte deg av den nåværende løsningen kan du vurdere å oppgradere nettleseren din, eller benytte en annen nettleser. Kanskje har du allerede andre installert på maskinen din? Under følger en liste over nettlesere vi vet fungerer:</p>
<ul>
  <li>Firefox: <a href="https://www.mozilla.org/nb-NO/firefox/new/">Last ned</a></li>
  <li>Google Chrome: <a href="https://support.google.com/chrome/answer/95346?co=GENIE.Platform%3DDesktop&hl=no">Last ned</a></li>

  <li>Microsoft Edge: <a href="https://www.microsoft.com/nb-no/windows/microsoft-edge">Last ned</a></li>
</ul></p>`;

var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
if (isIE11) {
  document.open();
  document.write(string);
  document.close();
} else
  ReactDOM.render(
    <BrowserRouter baseName={process.env.PUBLIC_URL}>
      <RootBoundary>
        <SettingsContainer>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </SettingsContainer>
      </RootBoundary>
    </BrowserRouter>,
    document.getElementById("root")
  );
