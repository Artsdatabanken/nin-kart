import React from "react";
import { withRouter } from "react-router-dom";
import Lokalitet from "InformasjonsVisning/Lokalitet/Lokalitet";
import Hjelp from "InformasjonsVisning/Hjelp/Hjelp";
import parseQueryString from "./Katalog/KatalogFunksjoner/parseQueryString";
import finnKurvevariabler from "./Katalog/KatalogFunksjoner/finnKurvevariabler";
import KatalogFane from "./Katalog/Katalog";
import Meny from "./Meny/Meny/Meny";

// Denne boksen inneholder alle informasjonsvisningssidene
class InformasjonsVisning extends React.Component {
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

    if (location.search && location.search.startsWith("?hjelp")) {
      return (
        <>
          {meny}
          <Hjelp aktivTab={aktivTab} />;
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

    return (
      <>
        {meny}

        <div
          className={
            (aktivTab === "informasjon" ? "mobile_on" : "mobile_off") +
            " main_body"
          }
        >
          {meta && (
            <KatalogFane
              meta={meta}
              onFitBounds={this.props.onFitBounds}
              onUpdateLayerProp={onUpdateLayerProp}
              onNavigate={this.handleNavigate}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              opplyst={opplyst}
              data={data}
              onUpdateMetaProp={onUpdateMetaProp}
              has_error={this.state.error}
              handleCloseSnackbar={this.handleCloseSnackbar}
              erAktivert={this.props.erAktivert}
              onToggleLayer={this.props.onToggleLayer}
              kurve={kurve}
            />
          )}
          <div className="big_page_sidebar" />
        </div>
      </>
    );
  }
  handleCloseSnackbar = () => this.setState({ error: null });
}

export default withRouter(InformasjonsVisning);
