import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as Sentry from "@sentry/browser";

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

var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
if (isIE11) {
  document.open();
  document.write(
    '<h1>Internet explorer 11 is sadly not supported.</h1><p>Please upgrade to a modern web browser.</p></p>Report issues on <a href="https://github.com/Artsdatabanken/nin-innsyn/issues">Github</a></a>'
  );
  document.close();
} else
  ReactDOM.render(
    <RootBoundary>
      <App />
    </RootBoundary>,
    document.getElementById("root")
  );
