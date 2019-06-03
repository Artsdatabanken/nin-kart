import React from "react";
import { ShowChart, Gradient } from "@material-ui/icons/";
import Gradienter from "./Gradienter";
import KurveContainer from "GjenbruksElement/Kurver/KurveContainer";
import Relasjon from "Sidebar/Katalog/Relasjoner/Relasjon";
import Kurve from "GjenbruksElement/Kurver/Kurve";
import EgenskapVariabel from "../Relasjoner/EgenskapVariabel";
import Ekspander from "GjenbruksElement/Ekspander";
//import { SettingsContext } from "SettingsContext";

const KatalogGradienter = ({
  onNavigate,
  meta,
  onMouseEnter,
  onMouseLeave,
  opplyst,
  ...props
}) => {
  /*  
  Contains the visualisation of the different gradients and their relations
  to subelements, as well as other nifty visualisations
  */
  if (!meta) return null;
  const { kode } = meta;

  const gradientLength = meta.gradient
    ? Object.entries(meta.gradient).length
    : 0;

  const relasjon = meta.graf;
  console.log(relasjon);

  const flaggLength = meta.flagg ? Object.entries(meta.flagg).length : 0;
  if (!meta.gradient) return null;
  return (
    <>
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
              //visKoder={context.visKoder}
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

      <Ekspander
        visible={flaggLength > 0}
        heading="Egenskaper"
        heading2={flaggLength}
      >
        <EgenskapVariabel
          flagg={meta.flagg}
          onNavigate={url => {
            console.warn(url);
            onNavigate(url);
            console.log("loading flagg: ", meta.flagg);
          }}
        />
      </Ekspander>

      {meta.graf &&
        meta.graf.map(relasjon => (
          <Relasjon
            key={relasjon.type}
            heading={relasjon.type}
            noder={relasjon.noder}
            opplyst={{ a: "b", ...opplyst }}
            parentkode={kode}
            onNavigate={onNavigate}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            expand={true}
            onSetExpand={true}
            //children={children}
            {...props}
          />
        ))}
    </>
  );
};
export default KatalogGradienter;
