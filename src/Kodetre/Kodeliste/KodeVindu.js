import Overordnet from "./Overordnet";
import React, { useState } from "react";
import språk from "../../språk";
import Graf from "./Graf";
import Flagg from "./Flagg";
import Kodekort from "./Kodekort";
import Kodeliste from "./Kodeliste";
import Statistikk from "./Statistikk";
import Gradienter from "./Gradienter";
import Ekspander from "./Ekspander";
import Ingress from "./Ingress";

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
  onUpdateMetaProp
}) => {
  const [expand, setExpand] = useState({
    tagger: false,
    ingress: false,
    stats: false,
    innhold: false,
    gradient: false,
    flagg: false
  });
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
  const mor = overordnet[0] || { tittel: {} };
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
        heading2={"Nivå " + overordnet.length}
        onExpand={() => setExpand({ ...expand, tagger: !expand.tagger })}
      >
        <Overordnet overordnet={overordnet} onNavigate={onNavigate} />
      </Ekspander>

      <Ekspander
        visible={!!ingress}
        expanded={expand.ingress}
        heading="Beskrivelse"
        onExpand={() => setExpand({ ...expand, ingress: !expand.ingress })}
      >
        <Ingress beskrivelse={ingress} infoUrl={infoUrl} />
      </Ekspander>
      <Ekspander
        visible={prefiks !== "AO" && !!stats}
        expanded={expand.stats}
        heading="Statistikk"
        onExpand={() => setExpand({ ...expand, stats: !expand.stats })}
      >
        <Statistikk
          tittel={språk(meta.tittel)}
          infoUrl={infoUrl}
          stats={stats}
          arealPrefix={mor.areal}
          toppnavn={mor.tittel.nb}
          arealVindu={antallArter}
          arterVindu={antallArter}
          geometrierVindu={antallNaturomrader}
        />
      </Ekspander>

      <Ekspander
        expanded={expand.innhold}
        visible={meta.barn.length > 0}
        heading="Inndelt i"
        heading2={(antall(meta.barn.length), "type", "typer")}
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
        heading2={antall(gradientLength, "element", "elementer")}
        onExpand={() => setExpand({ ...expand, gradient: !expand.gradient })}
      >
        <Gradienter gradient={meta.gradient} onNavigate={onNavigate} />
      </Ekspander>

      <Ekspander
        expanded={expand.flagg}
        visible={flaggLength > 0}
        heading="Egenskaper"
        heading2={antall(flaggLength, "element", "elementer")}
        onExpand={() => setExpand({ ...expand, flagg: !expand.flagg })}
      >
        <Flagg
          flagg={meta.flagg}
          onNavigate={url => {
            console.warn(url);
            onNavigate(url);
          }}
        />
      </Ekspander>

      <Graf graf={meta.graf} parentkode={kode} onNavigate={onNavigate} />
    </div>
  );
};

function antall(count, singularSuffix, pluralSuffix) {
  return count + " " + (count === 1 ? singularSuffix : pluralSuffix);
}

export default KodeVindu;
