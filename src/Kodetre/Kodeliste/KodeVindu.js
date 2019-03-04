import Tagger from "./Tagger";
import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import språk from "../../språk";
import Graf from "./Graf";
import Flagg from "./Flagg";
import Kodekort from "./Kodekort";
import Kodeliste from "./Kodeliste";
import Statistikk from "./Statistikk";
import Gradienter from "./Gradienter";
import Ekspander from "./Ekspander";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
});

const KodeVindu = ({
  erAktivert,
  onNavigate,
  onFitBounds,
  meta,
  data,
  onMouseEnter,
  onMouseLeave,
  onToggleLayer,
  opplystKode,
  onUpdateMetaProp,
  classes
}) => {
  const [expand, setExpand] = useState({
    tagger: false,
    stats: false,
    innhold: false,
    gradient: false,
    flagg: false
  });
  console.log(expand);
  if (!meta) return null;
  const {
    kode,
    url,
    farge,
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
  const gradientLength = meta.gradient
    ? Object.entries(meta.gradient).length
    : 0;
  const flaggLength = meta.flagg ? Object.entries(meta.flagg).length : 0;
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
        farge={farge}
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

      <Ekspander
        visible={overordnet.length > 0}
        expanded={expand.tagger}
        heading="Klassifisering"
        heading2={"Nivå " + (overordnet.length + 1)}
        onExpand={() => setExpand({ ...expand, tagger: !expand.tagger })}
      >
        <Tagger overordnet={overordnet} onNavigate={onNavigate} />
      </Ekspander>

      <Ekspander
        visible={prefiks !== "AO"}
        expanded={expand.stats}
        heading="Beskrivelse"
        onExpand={() => setExpand({ ...expand, stats: !expand.stats })}
      >
        <Statistikk
          tittel={språk(meta.tittel)}
          toppnavn={toppnivåNavn(meta.overordnet)}
          ingress={ingress}
          infoUrl={infoUrl}
          stats={stats}
          arealVindu={antallArter}
          arterVindu={antallArter}
          geometrierVindu={antallNaturomrader}
        />
      </Ekspander>

      <Ekspander
        expanded={expand.innhold}
        visible={meta.barn.length > 0}
        heading="Inndelt i"
        heading2={
          meta.barn.length === 1 ? "1 type" : meta.barn.length + " typer"
        }
        onExpand={() => setExpand({ ...expand, innhold: !expand.innhold })}
      >
        <Kodeliste
          title=""
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
      </Ekspander>

      <Ekspander
        expanded={expand.gradient}
        visible={gradientLength > 0}
        heading="Gradienter"
        heading2={
          gradientLength === 1 ? "1 element" : gradientLength + " elementer"
        }
        onExpand={() => setExpand({ ...expand, gradient: !expand.gradient })}
      >
        <Gradienter gradient={meta.gradient} onNavigate={onNavigate} />
      </Ekspander>

      <Ekspander
        expanded={expand.flagg}
        visible={flaggLength > 0}
        heading="Egenskaper"
        heading2={flaggLength === 1 ? "1 element" : flaggLength + " elementer"}
        onExpand={() => setExpand({ ...expand, flagg: !expand.flagg })}
      >
        <Flagg flagg={meta.flagg} onNavigate={onNavigate} />
      </Ekspander>

      <Graf graf={meta.graf} parentkode={kode} onNavigate={onNavigate} />
    </div>
  );
};

function toppnivåNavn(forfedre) {
  if (forfedre.length < 2) return null;
  return språk(forfedre[forfedre.length - 2].tittel);
}
export default withStyles(styles)(KodeVindu);
