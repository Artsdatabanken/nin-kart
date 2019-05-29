import React, { useState, useEffect } from "react";
import Graf from "./Graf";
import Flagg from "./Flagg";
import Gradienter from "./Gradienter";
import Ekspander from "GjenbruksElement/Ekspander";
import Kurver from "./Kurver";
import Kurve from "./Kurve";
import { ShowChart, Gradient } from "@material-ui/icons/";
import KurveContainer from "./KurveContainer";
import Nedlasting from "./Nedlasting";
import { SettingsContext } from "../../SettingsContext";

const KodeVindu = ({
  onNavigate,
  meta,
  kurve,
  onMouseEnter,
  onMouseLeave,
  opplyst
}) => {
  const initialExpand = () =>
    JSON.parse(localStorage.getItem("expand") || "{}");
  const [expand, setExpand] = useState(initialExpand);
  useEffect(() => {
    localStorage.setItem("expand", JSON.stringify(expand));
  }, [expand]);
  if (!meta) return null;
  const { kode, url } = meta;
  const gradientLength = meta.gradient
    ? Object.entries(meta.gradient).length
    : 0;

  const flaggLength = meta.flagg ? Object.entries(meta.flagg).length : 0;
  return (
    <SettingsContext.Consumer>
      {context => {
        return (
          <div>
            {meta.gradient &&
              Object.entries(meta.gradient).map(([kode, node]) => (
                <Ekspander
                  key={kode}
                  visible={gradientLength > 0}
                  heading={node.tittel.nb}
                  heading2={Object.values(node.barn).length}
                  icon={<Gradient />}
                >
                  <Gradienter
                    gradient={node.barn}
                    onNavigate={onNavigate}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    opplyst={opplyst}
                    visKoder={context.visKoder}
                  />
                </Ekspander>
              ))}
            {true && meta.kart.format.raster_gradient && (
              <Ekspander
                visible={true}
                heading={"Frekvens"}
                heading2=""
                icon={<ShowChart />}
              >
                <KurveContainer gradient={meta}>
                  <Kurve logY={true} />
                </KurveContainer>
              </Ekspander>
            )}
            {kurve && (
              <Ekspander
                visible={true}
                heading={"Relativ frekvens"}
                heading2=""
                icon={<ShowChart />}
              >
                <Kurver
                  meta={meta}
                  punkt={kurve.punkt}
                  gradient={kurve.gradient}
                />
              </Ekspander>
            )}
            <Ekspander
              visible={flaggLength > 0}
              heading="Egenskaper"
              heading2={flaggLength}
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
              expand={expand}
              onSetExpand={setExpand}
              opplyst={opplyst}
            />
            <Nedlasting
              url={url}
              heading="Datakilde"
              noder={meta.datakilde}
              parentkode={kode}
              onNavigate={onNavigate}
              expand={expand}
              onSetExpand={setExpand}
              opplyst={opplyst}
            />
          </div>
        );
      }}
    </SettingsContext.Consumer>
  );
};

export default KodeVindu;
