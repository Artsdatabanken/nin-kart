import { Snackbar } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";
import Lokalitet from "Sidebar/Lokalitet/Lokalitet";
import KodeVindu from "Kodetre/Kodeliste/KodeVindu";
import InformasjonsFane from "Sidebar/Informasjon/InformasjonsFane";
import parseQueryString from "./KatalogFunksjoner/parseQueryString";
import finnKurvevariabler from "./KatalogFunksjoner/finnKurvevariabler";
import KatalogHeader from "./KatalogHeader/KatalogHeader";

// Alt som dukker opp i vinduet på venstre side av skjermen
class KatalogFane extends React.Component {
  dataQueryNumber = 0;
  state = {
    error: "",
    data: {}
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.meta !== this.props.meta) this.setState({ query: null });
  }

  handleNavigate = url => {
    this.props.history.push("/" + url);
  };

  render() {
    const data = this.state.data;
    const {
      opplyst,
      onMouseEnter,
      onMouseLeave,
      onUpdateLayerProp,
      onUpdateMetaProp,
      meta,
      location
    } = this.props;

    if (location.search && location.search.startsWith("?info")) {
      return <InformasjonsFane />;
    }
    if (location.search && location.search.startsWith("?lng")) {
      const { lng, lat, vis } = parseQueryString(location.search);
      return <Lokalitet lng={lng} lat={lat} vis={vis} />;
    }
    const kurve = finnKurvevariabler(this.props.aktiveLag);
    return (
      <>
        <KatalogHeader meta={meta} onFitBounds={this.props.onFitBounds} />
        <KodeVindu
          data={data}
          meta={meta}
          onNavigate={this.handleNavigate}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onFitBounds={this.props.onFitBounds}
          erAktivert={this.props.erAktivert}
          opplyst={opplyst}
          onToggleLayer={this.props.onToggleLayer}
          onUpdateLayerProp={onUpdateLayerProp}
          onUpdateMetaProp={onUpdateMetaProp}
          kurve={kurve}
        />

        {this.state.error && (
          <Snackbar
            open={true}
            message={"Søk feilet: " + JSON.stringify(this.state.error)}
            autoHideDuration={4000}
            onRequestClose={this.handleCloseSnackbar}
          />
        )}
        <div />
      </>
    );
  }
  handleCloseSnackbar = () => this.setState({ error: null });
}

export default withRouter(KatalogFane);
