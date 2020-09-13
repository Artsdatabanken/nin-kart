import React from "react";
import { withRouter } from "react-router-dom";
import finnKurvevariabler from "./Katalog/KatalogFunksjoner/finnKurvevariabler";
import KatalogFane from "./Katalog/Katalog";
import Punkt from "./Punkt";

// Denne boksen inneholder alle informasjonsvisningssidene
class InformasjonsVisning extends React.Component {
  render() {
    const {
      punkt,
      opplyst,
      onMouseEnter,
      onMouseLeave,
      onUpdateLayerProp,
      onUpdateMetaProp,
      meta,
      aktivTab,
      path,
      onNavigate,
    } = this.props;
    const kurve = finnKurvevariabler(this.props.aktiveLag);

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
            onNavigate={onNavigate}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            opplyst={opplyst}
            onUpdateMetaProp={onUpdateMetaProp}
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
}

export default withRouter(InformasjonsVisning);
