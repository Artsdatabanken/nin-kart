import React from "react";
import { withRouter } from "react-router-dom";
import Lokalitet from "InformasjonsVisning/Lokalitet/Lokalitet";
import Hjelp from "InformasjonsVisning/Hjelp/Hjelp";
import parseQueryString from "./Katalog/KatalogFunksjoner/parseQueryString";
import finnKurvevariabler from "./Katalog/KatalogFunksjoner/finnKurvevariabler";
import KatalogFane from "./Katalog/Katalog";

// Denne boksen inneholder alle informasjonsvisningssidene
class InformasjonsVisning extends React.Component {
  dataQueryNumber = 0;
  state = {
    error: "",
    data: {}
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
      aktivTab,
      path,
      handleNavigate,
      handleLokalitetUpdate
    } = this.props;
    const kurve = finnKurvevariabler(this.props.aktiveLag);

    if (path === "/Natur_i_Norge/hjelp") {
      return <Hjelp aktivTab={aktivTab} />;
    }

    if (
      location.search &&
      location.search.includes("?lng") &&
      path.includes("lokalitet")
    ) {
      const { lng, lat, vis } = parseQueryString(location.search);
      return (
        <Lokalitet
          lng={lng}
          lat={lat}
          vis={vis}
          aktivTab={aktivTab}
          history={this.props.history}
          onNavigate={handleNavigate}
          handleLokalitetUpdate={handleLokalitetUpdate}
        />
      );
    }

    return (
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
            onNavigate={handleNavigate}
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
    );
  }
  handleCloseSnackbar = () => this.setState({ error: null });
}

export default withRouter(InformasjonsVisning);
