import React from "react";
import { withRouter } from "react-router";
import tinycolor from "tinycolor2";
import PolygonlagElement from "../AktiveKartlag/PolygonlagElement";
import ColorPicker from "./ColorPicker";

const Barneliste = ({
  barn,
  aktivtBarn,
  onUpdateLayerProp,
  onMouseEnter,
  onMouseLeave,
  history,
  forelderkode,
  visKoder
}) => {
  return Object.keys(barn).map(i => {
    const node = barn[i];
    const kode = node.kode;
    return (
      <React.Fragment key={kode}>
        <PolygonlagElement
          kode={kode}
          erSynlig={node.erSynlig}
          tittel={node.tittel}
          undertittel={kode}
          farge={node.farge}
          onUpdateLayerProp={() =>
            onUpdateLayerProp(i, "erSynlig", !node.erSynlig)
          }
          onMouseLeave={onMouseLeave}
          onMouseEnter={() => onMouseEnter({ kode, url: node.url })}
          onClick={() => {
            history.push(history.location.pathname + "?vis_barn=" + i);
          }}
          visKoder={visKoder}
        />
        {aktivtBarn === kode && (
          <ColorPicker
            tittel={"Fyllfarge"}
            color={node.farge}
            onChange={farge => {
              const rgbString = tinycolor(farge.rgb).toRgbString();
              onUpdateLayerProp(i, "farge", rgbString);
            }}
          />
        )}
      </React.Fragment>
    );
  });
};

export default withRouter(Barneliste);
