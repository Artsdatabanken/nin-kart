import React from "react";
import { Snackbar } from "@material-ui/core";
import KatalogHeader from "./KatalogHeader/KatalogHeader";
//import Egenskaper from "./Klassifiseringer/Egenskaper";
import KatalogBarneliste from "./KatalogBarneliste/KatalogBarneliste";
import KatalogGradienter from "./KatalogGradienter/KatalogGradienter";
import KatalogKilder from "./KatalogKilder/KatalogKilder";

const KatalogFane = ({
  meta,
  onUpdateLayerProp,
  onFitBounds,
  onNavigate,
  onMouseEnter,
  onMouseLeave,
  opplyst,
  onUpdateMetaProp,
  has_error,
  handleCloseSnackbar,
  erAktivert,
  onToggleLayer,
  kurve
}) => {
  if (!meta) return null;
  return (
    <>
      <div className="katalog-content">
        <KatalogHeader
          meta={meta}
          onFitBounds={onFitBounds}
          onUpdateLayerProp={onUpdateLayerProp}
        />

        <KatalogGradienter
          meta={meta}
          onNavigate={onNavigate}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          opplyst={opplyst}
        />

        <KatalogBarneliste
          meta={meta}
          onNavigate={onNavigate}
          onUpdateMetaProp={onUpdateMetaProp}
          opplyst={opplyst}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          isDatakilde={meta.tittel.nb}
        />

        {has_error && (
          <Snackbar
            open={true}
            message={"Søk feilet: " + JSON.stringify(this.state.error)}
            autoHideDuration={4000}
            onRequestClose={handleCloseSnackbar}
          />
        )}

        <KatalogKilder
          meta={meta}
          onNavigate={onNavigate}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onFitBounds={onFitBounds}
          erAktivert={erAktivert}
          opplyst={opplyst}
          onToggleLayer={onToggleLayer}
          onUpdateLayerProp={onUpdateLayerProp}
          onUpdateMetaProp={onUpdateMetaProp}
          kurve={kurve}
        />
      </div>
    </>
  );
};
export default KatalogFane;
