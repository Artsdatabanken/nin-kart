import { Snackbar } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";
import BorreContainer from "./Borring/BorreContainer";
import KodeContainer from "./Kodetre/Kodeliste/KodeContainer";
import språk from "./språk";

import InformasjonsFane from "Informasjon/InformasjonsFane";

// Alt som dukker opp i vinduet på venstre side av skjermen
class KatalogFane extends React.Component {
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
      const { lng, lat, vis } = this.parseQueryString(location.search);
      return <BorreContainer lng={lng} lat={lat} vis={vis} />;
    }
    const kurve = finnKurvevariabler(this.props.aktiveLag);
    return (
      <>
        <KodeContainer
          kode={meta && meta.kode}
          onNavigate={this.handleNavigate}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onFitBounds={this.props.onFitBounds}
          erAktivert={this.props.erAktivert}
          opplyst={opplyst}
          onToggleLayer={this.props.onToggleLayer}
          mapBounds={this.props.mapBounds}
          language={this.props.language}
          meta={this.props.meta}
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

function finnKurvevariabler(aktiveLag) {
  let r = { punkt: [], gradient: [] };
  for (const lag of Object.values(aktiveLag)) asn(lag, r);
  if (r.gradient.length === 0 && r.punkt.length === 0) return null;
  return r;
}

function asn(lag, r) {
  if (!lag) return;
  if (!lag.kart) return;
  if (lag.kart.format.raster_gradient) r.gradient.push(lag);
  if (lag.kart.format.raster_ruter) r.punkt.push(lag);
}

export default withRouter(KatalogFane);
