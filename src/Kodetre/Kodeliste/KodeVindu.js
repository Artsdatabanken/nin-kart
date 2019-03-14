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
import antall from "./antall";
import Kurver from "./Kurver";
import {
  CallSplit,
  MergeType,
  ArrowUpwardOutlined,
  DescriptionOutlined,
  TimelineOutlined,
  ShowChart,
  Gradient
} from "@material-ui/icons/";

import { SettingsContext } from "../../SettingsContext";

const KodeVindu = ({
  erAktivert,
  onNavigate,
  onFitBounds,
  meta,
  data,
  kurve,
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
    <SettingsContext.Consumer>
      {context => {
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
              visible={!!ingress}
              expanded={expand.ingress}
              heading="Beskrivelse"
              icon={<DescriptionOutlined />}
              onExpand={() =>
                setExpand({ ...expand, ingress: !expand.ingress })
              }
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
              visible={overordnet.length > 0}
              expanded={expand.tagger}
              icon={<MergeType />}
              heading="Klassifisering"
              heading2={"Nivå " + overordnet.length}
              onExpand={() => setExpand({ ...expand, tagger: !expand.tagger })}
            >
              <Overordnet overordnet={overordnet} onNavigate={onNavigate} />
            </Ekspander>
            <Ekspander
              expanded={expand.innhold}
              visible={meta.barn.length > 0}
              heading={meta.undernivå}
              heading2={meta.barn.length}
              icon={<CallSplit style={{ transform: "rotate(180deg)" }} />}
              onExpand={() =>
                setExpand({ ...expand, innhold: !expand.innhold })
              }
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
              heading="Gradient"
              heading2={gradientLength}
              icon={<Gradient />}
              onExpand={() =>
                setExpand({ ...expand, gradient: !expand.gradient })
              }
            >
              <Gradienter
                gradient={meta.gradient}
                onNavigate={onNavigate}
                visKoder={context.visKoder}
              />
            </Ekspander>
            {kurve && (
              <Ekspander
                expanded={expand.stat1d}
                visible={true}
                heading={"Observasjoner"}
                heading2={"graf"}
                icon={<ShowChart />}
                onExpand={() =>
                  setExpand({ ...expand, stat1d: !expand.stat1d })
                }
              >
                <Kurver
                  meta={meta}
                  punkt={kurve.punkt}
                  gradient={kurve.gradient}
                />
              </Ekspander>
            )}

            <Ekspander
              expanded={expand.flagg}
              visible={flaggLength > 0}
              heading="Egenskaper"
              heading2={flaggLength}
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

            <Graf
              url={url}
              graf={meta.graf}
              parentkode={kode}
              onNavigate={onNavigate}
            />
          </div>
        );
      }}
    </SettingsContext.Consumer>
  );
};

export default KodeVindu;
