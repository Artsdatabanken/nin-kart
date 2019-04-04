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

var string = "";
string += '<div style="max-width:50%;margin:auto;">';
string += "<h1>Naturtyper i Norge</h1>";
string +=
  "<p>Du har forsøkt å åpne NiN-kart i nettlesereren Internet Explorer, hvor vi ikke har en ferdig løsning enda.</p>";
string +=
  "<p> Hvis du ønsker å benytte deg av den nåværende løsningen kan du vurdere å oppgradere nettleseren din, eller benytte en annen nettleser. Kanskje har du allerede andre installert på maskinen din? Under følger en liste over nettlesere vi vet fungerer:</p>";
string += "<ul>";
string +=
  '<li>Firefox: <a href="https://www.moilla.org/nb-NO/firefox/new/">Last ned</a></li>';
string +=
  '<li>Google Chrome: <a href="https://support.google.com/chrome/answer/95346?co=GENIE.Platform%3DDesktop&hl=no">Last ned</a></li>';
string +=
  '<li>Microsoft Edge: <a href="https://www.microsoft.com/nb-no/windows/microsoft-edge">Last ned</a></li>';
string += "</ul></p>";
string +=
  '<h2>Åpne Data</h2><p>Innhold fra kartviseren finnes også i den tilhørende dataportalen for åpne data. <br/> Gå til dataportalen <a href="https://data.artsdatabanken.no/">her</a>';
string +=
  '<h2>Les om Naturtyper i Norge</h2><p>Du kan lese mer om Naturtyper i Norge, NiN, her: <a href="https://www.Artsdatabanken.no/NiN">her</a></div>';

var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
if (isIE11) {
  document.open();
  document.write(string);
  document.close();
} else
  ReactDOM.render(
    <RootBoundary>
      <App />
    </RootBoundary>,
    document.getElementById("root")
  );
