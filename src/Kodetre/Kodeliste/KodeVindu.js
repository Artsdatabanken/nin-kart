import React from "react";
import språk from "../../språk";
import Graf from "./Graf";
import Flagg from "./Flagg";
import Kodekort from "./Kodekort";
import Kodeliste from "./Kodeliste";
import Statistikk from "./Statistikk";
import Gradienter from "./Gradienter";

class KodeVindu extends React.Component {
  render() {
    const {
      erAktivert,
      onNavigate,
      onFitBounds,
      meta,
      data,
      onMouseEnter,
      onMouseLeave,
      onToggleLayer,
      opplystKode,
      onUpdateMetaProp
    } = this.props;
    if (!meta) return null;
    const {
      kode,
      url,
      prefiks,
      bbox,
      ingress,
      infoUrl,
      tittel,
      nivå,
      overordnet,
      antallNaturomrader,
      antallArter,
      stats
    } = meta;
    return (
      <div
        square="false"
        elevation={4}
        style={{
          position: "relative",
          top: -72
        }}
      >
        <Kodekort
          kode={kode}
          url={url}
          prefiks={prefiks}
          bbox={bbox}
          tittel={tittel}
          nivå={nivå}
          overordnet={overordnet}
          onNavigate={onNavigate}
          erAktivert={erAktivert}
          onFitBounds={onFitBounds}
          onToggleLayer={onToggleLayer}
        />
        <Flagg flagg={meta.flagg} onNavigate={onNavigate} />

        {prefiks !== "AO" && (
          <Statistikk
            tittel={språk(meta.tittel)}
            toppnavn={this.toppnivåNavn(meta.overordnet)}
            ingress={ingress}
            infoUrl={infoUrl}
            stats={stats}
            arealVindu={antallArter}
            arterVindu={antallArter}
            geometrierVindu={antallNaturomrader}
          />
        )}
        <Kodeliste
          title="Innholder"
          parentkode={kode}
          størsteAreal={data.størsteAreal}
          apidata={data.barn}
          metadata={meta.barn}
          onNavigate={onNavigate}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          opplystKode={opplystKode}
          onUpdateMetaProp={onUpdateMetaProp}
        />
        <Gradienter gradient={meta.gradient} onNavigate={onNavigate} />
        <Graf graf={meta.graf} parentkode={kode} onNavigate={onNavigate} />
      </div>
    );
  }

  toppnivåNavn(forfedre) {
    if (forfedre.length < 2) return null;
    return språk(forfedre[forfedre.length - 2].tittel);
  }
}

export default KodeVindu;
