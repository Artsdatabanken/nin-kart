import { Snackbar } from "@material-ui/core";
import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import BorreContainer from "./Borring/BorreContainer";
import KodeContainer from "./Kodetre/Kodeliste/KodeContainer";
import språk from "./språk";
import Tweaks from "./Tweaks/";
import Panel from "./components/Panel";
import TopBarContainer from "./TopBar/TopBarContainer";
import AktiveKartlag from "./AktiveKartlag/";

// Alt som dukker opp i vinduet på venstre side av skjermen
class VenstreVinduContainer extends React.Component {
  state = { error: "" };
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
    var item = this.props.meta;
    Object.keys(this.props.aktiveLag).forEach(id => {
      const forelder = this.props.aktiveLag[id];
      if (forelder.kode === kode) item = forelder;
    });
    return item;
  }

  handleNavigate = url => {
    this.props.history.push("/" + url);
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
    const {
      meta,
      visAktiveLag,
      unknownUrl,
      onMouseEnter,
      onMouseLeave,
      onUpdateLayerProp,
      onUpdateMetaProp,
      onRemoveSelectedLayer,
      location
    } = this.props;
    if (location.search && location.search.startsWith("?vis")) {
      const node = this.props.aktiveLag[location.pathname.substring(1)] || meta;
      return (
        <Panel>
          <TopBarContainer
            tittel={node ? språk(node.tittel) + ": Visning" : ""}
          />
          <Tweaks
            {...node}
            onFitBounds={this.props.onFitBounds}
            onUpdateLayerProp={onUpdateLayerProp}
            onRemoveSelectedLayer={onRemoveSelectedLayer}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        </Panel>
      );
    }
    if (location.search && location.search.startsWith("?lng")) {
      const { lng, lat, vis } = this.parseQueryString(location.search);
      return (
        <Panel>
          <TopBarContainer
            tittel={`${parseFloat(lat).toFixed(5)}° N ${parseFloat(lng).toFixed(
              5
            )}° Ø`}
          />
          <BorreContainer lng={lng} lat={lat} vis={vis} />
        </Panel>
      );
    }
    return (
      <React.Fragment>
        <Switch>
          <Route
            path="/:url*"
            render={({ match, history }) => {
              return (
                <Panel>
                  <TopBarContainer
                    tittel={this.tittel(meta)}
                    unknownUrl={unknownUrl}
                  />
                  <KodeContainer
                    kode={meta && meta.kode}
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
  }

  handleCloseSnackbar = () => this.setState({ error: null });
}

export default withRouter(VenstreVinduContainer);
