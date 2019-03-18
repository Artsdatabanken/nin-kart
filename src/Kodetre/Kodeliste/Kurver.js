import KurveContainer from "./KurveContainer";
import React from "react";
import { ListSubheader } from "@material-ui/core";
import språk from "../../språk";
import Kurve from "./Kurve";

const Kurver = ({ meta, punkt, gradient }) => {
  if (!meta || !meta.kart || !meta.kart.format) return null;
  const metaErGradient = meta.kart.format.raster_gradient;
  if (!metaErGradient && !meta.kart.format.raster_ruter) return null;
  const andre = metaErGradient ? punkt : gradient;
  return andre.map(a => (
    <div>
      <ListSubheader>{språk(a.tittel)}</ListSubheader>
      <KurveContainer
        key={a.url}
        punkt={metaErGradient ? a : meta}
        gradient={metaErGradient ? meta : a}
      >
        <Kurve />
      </KurveContainer>
    </div>
  ));
};

export default Kurver;
