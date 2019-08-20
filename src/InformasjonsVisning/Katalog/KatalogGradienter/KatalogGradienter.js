import React from "react";
import { ShowChart } from "@material-ui/icons/";
import Gradienter from "./Gradienter";
import KurveContainer from "GjenbruksElement/Kurver/KurveContainer";
import Relasjon from "InformasjonsVisning/Katalog/Relasjoner/Relasjon";
import Kurve from "GjenbruksElement/Kurver/Kurve";
import Ekspander from "GjenbruksElement/Ekspander";

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
  let title;

  if (!meta.gradient) return null;
  if (meta.kode === "NN-NA") return null;
  if (meta.kode === "NN-NA-TI") return null;
  if (meta.kode.substr(0, 9) === "NN-NA-LKM") return null;
  if (meta.kode.substr(0, 5) === "NN-LA")
    title = "Landskapsgradienter i denne landskapstypen";

  if (meta.kode === "NN-LA") return null;
  if (meta.kode === "NN-LA-TI") return null;
  if (meta.kode.substr(0, 9) === "NN-LA-KLG") return null;
  if (meta.kode.substr(0, 5) === "NN-NA")
    title = "Miljøvariabler for naturtypen";

  return (
    <>
      {meta.gradient &&
        Object.entries(meta.gradient).map(([kode, node]) => (
          <Gradienter
            gradient={node.barn}
            onNavigate={onNavigate}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            opplyst={opplyst}
            key={kode}
            title={title}
          />
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
            {...props}
          />
        ))}
    </>
  );
};
export default KatalogGradienter;
