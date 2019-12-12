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
