import React from "react";
import { Snackbar } from "@material-ui/core";
import KatalogHeader from "./KatalogHeader/KatalogHeader";
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
  data,
  onUpdateMetaProp,
  has_error,
  handleCloseSnackbar,
  erAktivert,
  onToggleLayer,
  kurve
}) => {
  /*  */
  if (!meta) return null;

  //console.log(meta);
  return (
    <>
      <div className="main_body_wrapper">
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
          data={data}
          onUpdateMetaProp={onUpdateMetaProp}
          opplyst={opplyst}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
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
          data={data}
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
