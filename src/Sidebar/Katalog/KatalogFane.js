import { Snackbar } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";
import Lokalitet from "Sidebar/Lokalitet/Lokalitet";
import KatalogKilder from "./KatalogKilder/KatalogKilder";
import InformasjonsFane from "Sidebar/Informasjon/InformasjonsFane";
import parseQueryString from "./KatalogFunksjoner/parseQueryString";
import finnKurvevariabler from "./KatalogFunksjoner/finnKurvevariabler";
import KatalogHeader from "./KatalogHeader/KatalogHeader";
import KatalogGradienter from "./KatalogGradienter/KatalogGradienter";
import Meny from "Meny/Meny/Meny";
import KatalogBarneliste from "./KatalogBarneliste/KatalogBarneliste";
//import AktiverKartlagKnapp from "./AktiverKartlagKnapp/AktiverKartlagKnapp";

// Alt som dukker opp i vinduet på venstre side av skjermen
class KatalogFane extends React.Component {
  dataQueryNumber = 0;
  state = {
    error: "",
    data: {}
  };

  handleNavigate = url => {
    this.props.history.push("/" + url);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.meta !== this.props.meta) this.setState({ query: null });
  }

  render() {
    const data = this.state.data;
    const {
      opplyst,
      onMouseEnter,
      onMouseLeave,
      onUpdateLayerProp,
      onUpdateMetaProp,
      meta,
      location,
      //erAktivert,
      //onFitBounds,
      //onToggleLayer,
      aktivTab
    } = this.props;

    const kurve = finnKurvevariabler(this.props.aktiveLag);
    const meny = (
      <div
        className={
          (aktivTab === "meny" ? "mobile_on" : "mobile_off") + " sidebar "
        }
      >
        <Meny
          meta={meta}
          onNavigate={this.handleNavigate}
          data={data}
          onUpdateMetaProp={onUpdateMetaProp}
          opplyst={opplyst}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      </div>
    );

    if (location.search && location.search.startsWith("?info")) {
      return (
        <>
          {meny}
          <InformasjonsFane />;
        </>
      );
    }

    if (location.search && location.search.startsWith("?lng")) {
      const { lng, lat, vis } = parseQueryString(location.search);
      return (
        <>
          {meny}
          <Lokalitet
            lng={lng}
            lat={lat}
            vis={vis}
            aktivTab={aktivTab}
            history={this.props.history}
            onNavigate={this.handleNavigate}
          />
        </>
      );
    }

    if (!meta) return null;

    return (
      <>
        {meny}
        <div
          className={
            (aktivTab === "informasjon" ? "mobile_on" : "mobile_off") +
            " main_body"
          }
        >
          <div className="main_body_wrapper">
            <KatalogHeader
              meta={meta}
              onFitBounds={this.props.onFitBounds}
              onUpdateLayerProp={onUpdateLayerProp}
            />

            <KatalogGradienter
              meta={meta}
              onNavigate={this.handleNavigate}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              opplyst={opplyst}
            />

            <KatalogBarneliste
              meta={meta}
              onNavigate={this.handleNavigate}
              data={data}
              onUpdateMetaProp={onUpdateMetaProp}
              opplyst={opplyst}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            />

            {this.state.error && (
              <Snackbar
                open={true}
                message={"Søk feilet: " + JSON.stringify(this.state.error)}
                autoHideDuration={4000}
                onRequestClose={this.handleCloseSnackbar}
              />
            )}

            <KatalogKilder
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
          </div>
          <div className="big_page_sidebar" />
        </div>
      </>
    );
  }
  handleCloseSnackbar = () => this.setState({ error: null });
}

export default withRouter(KatalogFane);
