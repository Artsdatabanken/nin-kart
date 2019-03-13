import { Snackbar } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";
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
    const kurve = finnKurvevariabler(meta, this.props.aktiveLag);
    return (
      <React.Fragment>
        <Panel>
          <TopBarContainer tittel={this.tittel(meta)} unknownUrl={unknownUrl} />
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
            kurve={kurve}
          />
        </Panel>
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

function finnKurvevariabler(meta, aktiveLag) {
  let r = {};

  console.log(meta);
  console.log(aktiveLag);
  asn(meta, r);
  for (const lag of Object.values(aktiveLag)) asn(lag, r);
  if (r.gradient && r.punkt) return r;
  return null;
}

function asn(lag, r) {
  if (!lag) return;
  if (!lag.kart) return;
  if (lag.kart.format.raster_gradient) r.gradient = lag;
  if (lag.kart.format.raster_ruter) r.punkt = lag;
}

export default withRouter(VenstreVinduContainer);
