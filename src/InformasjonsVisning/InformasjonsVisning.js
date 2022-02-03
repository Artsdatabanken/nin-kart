import React from "react";
import LukkbartVindu from "../LukkbartVindu";
import { withRouter } from "react-router-dom";
import { Snackbar } from "@material-ui/core";
import finnKurvevariabler from "./Katalog/KatalogFunksjoner/finnKurvevariabler";
import språk from "../Funksjoner/språk";
import KatalogHeader from "./Katalog/KatalogHeader/KatalogHeader";
import KatalogGradienter from "./Katalog/KatalogGradienter/KatalogGradienter";
import KatalogBarneliste from "./Katalog/KatalogBarneliste/KatalogBarneliste";
import KatalogKilder from "./Katalog/KatalogKilder/KatalogKilder";
import { Info } from "@material-ui/icons";

class InformasjonsVisning extends React.Component {
  // Denne boksen inneholder alle informasjonssidene for kartlag
  render() {
    const { meta } = this.props;
    const kurve = finnKurvevariabler(this.props.aktiveLag);
    if (meta === null) {
      return null;
    }
    let title = språk(meta.tittel);
    if (title === "undefined") {
      title = "Informasjonsfane";
    }
    return (
      <LukkbartVindu
        onBack={() => this.props.onNavigateToTab("kartlag")}
        onClose={this.props.handleShow}
        show={this.props.show}
        tittel={"Kartlaginformasjon"}
        icon={<Info />}
      >
        {meta && (
          <>
            <div className="section">
              <KatalogHeader
                meta={meta}
                onFitBounds={this.props.onFitBounds}
                onUpdateLayerProp={this.props.onUpdateLayerProp}
              />
              <KatalogGradienter
                meta={meta}
                onNavigate={this.props.onNavigate}
                onMouseEnter={this.props.onMouseEnter}
                onMouseLeave={this.props.onMouseLeave}
                opplyst={this.props.opplyst}
              />
            </div>
            <KatalogBarneliste
              meta={meta}
              onNavigate={this.props.onNavigate}
              onUpdateMetaProp={this.props.onUpdateMetaProp}
              opplyst={this.props.opplyst}
              onMouseEnter={this.props.onMouseEnter}
              onMouseLeave={this.props.onMouseLeave}
              isDatakilde={meta.tittel.nb}
            />
            {this.props.has_error && (
              <Snackbar
                open={true}
                message={"Søk feilet: " + JSON.stringify(this.state.error)}
                autoHideDuration={4000}
                onRequestClose={this.props.handleCloseSnackbar}
              />
            )}
            <KatalogKilder
              meta={this.props.meta}
              onNavigate={this.props.onNavigate}
              onMouseEnter={this.props.onMouseEnter}
              onMouseLeave={this.props.onMouseLeave}
              onFitBounds={this.props.onFitBounds}
              erAktivert={this.props.erAktivert}
              opplyst={this.props.opplyst}
              onToggleLayer={this.props.onToggleLayer}
              onUpdateLayerProp={this.props.onUpdateLayerProp}
              onUpdateMetaProp={this.props.onUpdateMetaProp}
              kurve={this.props.kurve}
            />
          </>
        )}
      </LukkbartVindu>
    );
  }
}
export default withRouter(InformasjonsVisning);
