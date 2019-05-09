import React from "react";
import { withRouter } from "react-router";
import tinycolor from "tinycolor2";
import LegendeElement from "./LegendeBarn/LegendeElement";
import ColorPicker from "./ColorPicker";
import språk from "språk";

const Barneliste = ({
  barn,
  aktivtBarn,
  onUpdateLayerProp,
  history,
  visKoder
}) => {
  return Object.keys(barn).map(i => {
    const node = barn[i];
    const kode = node.kode;
    return (
      <React.Fragment key={kode}>
        <LegendeElement
          tittel={språk(node.tittel)}
          undertittel={visKoder && kode}
          erSynlig={node.erSynlig}
          farge={node.farge}
          kode={kode}
          goToColourMenu={() => {
            history.push(history.location.pathname + "?vis_barn=" + i);
          }}
          onUpdateLayerProp={onUpdateLayerProp}
        />

        {/*
        {aktivtBarn === kode && (
          <>
            <span>fargevelger</span>
            <ColorPicker
              tittel={"Fyllfarge"}
              color={node.farge}
              onChange={farge => {
                const rgbString = tinycolor(farge.rgb).toRgbString();
                onUpdateLayerProp(i, "farge", rgbString);
              }}
            />
          </>
        )}
*/}
      </React.Fragment>
    );
  });
};

export default withRouter(Barneliste);
