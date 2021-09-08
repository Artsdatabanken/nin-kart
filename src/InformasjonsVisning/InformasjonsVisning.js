import React from "react";
import LukkbartVindu from "../LukkbartVindu";
import { withRouter } from "react-router-dom";
import finnKurvevariabler from "./Katalog/KatalogFunksjoner/finnKurvevariabler";
import språk from "../Funksjoner/språk";
import Katalog from "./Katalog/Katalog";

// Denne boksen inneholder alle informasjonsvisningssidene
class InformasjonsVisning extends React.Component {
  render() {
    const {
      opplyst,
      onMouseEnter,
      onMouseLeave,
      onUpdateLayerProp,
      onUpdateMetaProp,
      meta,
      onNavigate,
      onNavigateToTab,
      onClose,
    } = this.props;
    const kurve = finnKurvevariabler(this.props.aktiveLag);

    return (
      <LukkbartVindu
        onBack={() => onNavigateToTab("kartlag")}
        onClose={onClose}
        tittel={meta && språk(meta.tittel)}
      >
        {meta && (
          <Katalog
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
      </LukkbartVindu>
    );
  }
}

export default withRouter(InformasjonsVisning);
