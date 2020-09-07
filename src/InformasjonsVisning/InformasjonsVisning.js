import React from "react";
import { withRouter } from "react-router-dom";
import Hjelp from "InformasjonsVisning/Hjelp/Hjelp";
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
      handleNavigate,
    } = this.props;
    const kurve = finnKurvevariabler(this.props.aktiveLag);

    if (path === "/Natur_i_Norge/hjelp") {
      return <Hjelp aktivTab={aktivTab} />;
    }
    if (punkt && punkt.lng) {
      return (
        <div
          style={{
            backgroundColor: "#fff",
            position: "absolute",
            overflowY: "auto",
            boxShadow:
              "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
            top: 56,
            bottom: 0,
            width: 408,
            right: 0,
          }}
        >
          <div style={{ margin: 8 }}>
            <Punkt
              punkt={this.props.punkt}
              aktivTab={aktivTab}
              onNavigate={handleNavigate}
            />
          </div>
        </div>
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
