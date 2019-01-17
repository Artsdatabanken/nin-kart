import ForsideMeny from "./Forsidemeny/Forsidemeny";
import { Snackbar } from "@material-ui/core";
import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import BorreContainer from "./Borring/BorreContainer";
import Borrevalg from "./Borring/Borrevalg";
import KodeContainer from "./Kodetre/Kodeliste/KodeContainer";
import språk from "./språk";
import TweakContainer from "./Tweaks/TweakContainer";
import Panel from "./components/Panel";
import TopBarContainer from "./TopBar/TopBarContainer";
import AktiveKartlag from "./AktiveKartlag/";

// Alt som dukker opp i vinduet på venstre side av skjermen
class VenstreVinduContainer extends React.Component {
  state = { error: "", visForside: true };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.meta !== this.props.meta) this.setState({ query: null });
  }

  tittel(meta, currentItem) {
    if (meta && meta.tittel) {
      return språk(meta.tittel);
    }
    return null;
  }

  finnValgtKodeElement(kode) {
    var item = undefined;
    Object.keys(this.props.aktiveLag).forEach(id => {
      const forelder = this.props.aktiveLag[id];
      if (forelder.kode === kode) item = forelder;
    });

    return item;
  }

  handleNavigate = url => {
    this.props.history.push("/katalog/" + url);
  };

  parseQueryString(query) {
    query = query.substring(1).split("&");
    return query.reduce((obj, item) => {
      const [key, value] = item.split("=");
      obj[key] = value;
      return obj;
    }, {});
  }

  render() {
    const meta = this.props.meta || {};
    const {
      visForside,
      onToggleForside,
      onAktiver,
      visAktiveLag,
      onMouseEnter,
      onMouseLeave,
      onUpdateLayerProp,
      onUpdateMetaProp,
      onRemoveSelectedLayer,
      location
    } = this.props;
    return (
      <Route
        render={({ match, history }) => {
          const args = this.parseQueryString(location.search);
          if (args.lng) {
            return (
              <Panel>
                <TopBarContainer
                  tittel={args.lng.substr(0, 8) + "," + args.lat.substr(0, 8)}
                />
                <BorreContainer
                  lng={args.lng}
                  lat={args.lat}
                  view={args.view}
                />
              </Panel>
            );
          }
          return (
            <React.Fragment>
              <Switch>
                <Route
                  path="/katalog/:kode*"
                  render={({ match, history }) => {
                    return (
                      <Panel>
                        <TopBarContainer
                          tittel={this.tittel(this.props.meta)}
                        />
                        <KodeContainer
                          kode={meta.kode}
                          onNavigate={this.handleNavigate}
                          onMouseEnter={onMouseEnter}
                          onMouseLeave={onMouseLeave}
                          onFitBounds={this.props.onFitBounds}
                          erAktivert={this.props.erAktivert}
                          opplystKode={this.props.opplystKode}
                          onToggleLayer={this.props.onToggleLayer}
                          mapBounds={this.props.mapBounds}
                          language={this.props.language}
                          meta={this.props.meta}
                          onUpdateMetaProp={onUpdateMetaProp}
                        />
                      </Panel>
                    );
                  }}
                />

                <Route
                  path="/lag/:kode/:lag?"
                  render={({ match, history }) => (
                    <Panel padTop>
                      <TopBarContainer
                        tittel={
                          "Innstillinger for " +
                          (match.params.lag || match.params.kode)
                        }
                      />
                      <TweakContainer
                        kode={match.params.kode}
                        lag={match.params.lag}
                        koder={this.props.aktiveLag}
                        {...this.finnValgtKodeElement(match.params.kode)}
                        onFitBounds={this.props.onFitBounds}
                        onUpdateLayerProp={onUpdateLayerProp}
                        onRemoveSelectedLayer={onRemoveSelectedLayer}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                      />
                    </Panel>
                  )}
                />
                <Route
                  path="/punkt/valg"
                  render={({ match, history }) => (
                    <Panel>
                      <TopBarContainer tittel="Klikk i kart" />
                      <Borrevalg />
                    </Panel>
                  )}
                />
                <Route
                  render={({ match, history }) => (
                    <ForsideMeny
                      onAktiver={onAktiver}
                      onVis={onToggleForside}
                      visForside={visForside}
                    />
                  )}
                />
              </Switch>
              {this.state.error && (
                <Snackbar
                  open={true}
                  message={"Søk feilet: " + JSON.stringify(this.state.error)}
                  autoHideDuration={4000}
                  onRequestClose={this.handleCloseSnackbar}
                />
              )}
              <div
                style={{
                  backgroundColor: "transparent",
                  justifyContent: "flex-end",
                  float: "bottom",
                  pointerEvents: "auto",
                  boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.3)"
                }}
              >
                <AktiveKartlag
                  erÅpen={visAktiveLag}
                  koder={this.props.aktiveLag}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  onUpdateLayerProp={onUpdateLayerProp}
                  onRemoveSelectedLayer={onRemoveSelectedLayer}
                />
              </div>
            </React.Fragment>
          );
        }}
      />
    );
  }

  handleCloseSnackbar = () => this.setState({ error: null });
}

export default withRouter(VenstreVinduContainer);
