import { ListSubheader } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";
import {
  Label,
  Equalizer,
  Close,
  Landscape,
  SwapVert
} from "@material-ui/icons";
import React, { Component } from "react";
import SliderSetting from "../SliderSetting";
import Veksle from "../Veksle";

class Terreng extends Component {
  render() {
    const { kode, terreng, onUpdateLayerProp } = this.props;
    const {
      vertikaltOverdriv = 2.5,
      visKontur = true,
      visEtikettKontur = true,
      visEtikettTopp = false
    } = terreng;
    return (
      <React.Fragment>
        <ListSubheader>Terreng</ListSubheader>
        <Veksle
          tittel="Vis terreng"
          toggled={terreng.erSynlig}
          icon={<Landscape />}
          onClick={() =>
            onUpdateLayerProp(kode, "terreng.erSynlig", !terreng.erSynlig)
          }
        />
        {terreng.erSynlig && (
          <React.Fragment>
            <SliderSetting
              value={vertikaltOverdriv}
              decimals={1}
              min={0}
              max={5}
              step={0.1}
              tittel="Vertikal overdrivelse"
              undertittel={vertikaltOverdriv.toFixed(1) + "x"}
              icon={<SwapVert />}
              onChange={v =>
                onUpdateLayerProp(kode, "terreng.vertikaltOverdriv", v)
              }
            />
            <Veksle
              tittel="Etiketter med høydeangivelse av topper"
              toggled={visEtikettTopp}
              icon={<Close />}
              onClick={() =>
                onUpdateLayerProp(
                  kode,
                  "terreng.visEtikettTopp",
                  !visEtikettTopp
                )
              }
            />
            <ListSubheader>Kontur (trinndelt høydevisualisering)</ListSubheader>
            <Veksle
              tittel="Konturlinjer"
              icon={<Equalizer />}
              toggled={visKontur}
              onClick={() =>
                onUpdateLayerProp(kode, "terreng.visKontur", !visKontur)
              }
            />
            <Veksle
              tittel="Etiketter med høydeangivelse"
              icon={<Label />}
              disabled={!visKontur}
              toggled={visEtikettKontur}
              onClick={() =>
                onUpdateLayerProp(
                  kode,
                  "terreng.visEtikettKontur",
                  !visEtikettKontur
                )
              }
            />{" "}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default withTheme()(Terreng);
