import React from "react";
import LukkbartVindu from "../LukkbartVindu";
import { withRouter } from "react-router-dom";
import finnKurvevariabler from "./Katalog/KatalogFunksjoner/finnKurvevariabler";
import språk from "../Funksjoner/språk";
import Katalog from "./Katalog/Katalog";
import { Info } from "@material-ui/icons";

class InformasjonsVisning extends React.Component {
  // Denne boksen inneholder alle informasjonssidene for kartlag
  render() {
    const { meta } = this.props;
    const kurve = finnKurvevariabler(this.props.aktiveLag);
    return (
      <LukkbartVindu
        onBack={() => this.props.onNavigateToTab("kartlag")}
        onClose={this.props.handleShow}
        show={this.props.show}
        tittel={meta && språk(meta.tittel)}
        icon={<Info />}
      >
        {meta && (
          <Katalog
            meta={meta}
            onFitBounds={this.props.onFitBounds}
            onUpdateLayerProp={this.props.onUpdateLayerProp}
            onNavigate={this.props.onNavigate}
            onMouseEnter={this.props.onMouseEnter}
            onMouseLeave={this.props.onMouseLeave}
            opplyst={this.props.opplyst}
            onUpdateMetaProp={this.props.onUpdateMetaProp}
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
