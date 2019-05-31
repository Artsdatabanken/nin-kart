import React from "react";
import { ShowChart, Gradient } from "@material-ui/icons/";
import Gradienter from "Kodetre/Kodeliste/Gradienter";
import KurveContainer from "Kodetre/Kodeliste/KurveContainer";
import Relasjon from "Kodetre/Kodeliste/Relasjon";
import Kurve from "Kodetre/Kodeliste/Kurve";
import Flagg from "Kodetre/Kodeliste/Flagg";
import Ekspander from "GjenbruksElement/Ekspander";
//import { SettingsContext } from "SettingsContext";

const KatalogGradienter = ({
  onNavigate,
  meta,
  onMouseEnter,
  onMouseLeave,
  opplyst
}) => {
  /*  
  Contains the visualisation of the different gradients and their relations
  to subelements, as well as other nifty visualisations
  */
  if (!meta) return null;
  const { parentkode, children } = meta;
  const gradientLength = meta.gradient
    ? Object.entries(meta.gradient).length
    : 0;

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
        <Flagg
          flagg={meta.flagg}
          onNavigate={url => {
            console.warn(url);
            onNavigate(url);
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
            parentkode={parentkode}
            onNavigate={onNavigate}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            expand={true}
            onSetExpand={true}
            children={children}
          />
        ))}
    </>
  );
};
export default KatalogGradienter;
