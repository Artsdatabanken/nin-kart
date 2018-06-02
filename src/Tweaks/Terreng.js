import muiThemeable from 'material-ui/styles/muiThemeable'
import SwapVert from 'material-ui/svg-icons/action/swap-vert'
import Landscape from 'material-ui/svg-icons/image/landscape'
import React, { Component } from 'react'
import Overskrift from './Overskrift'
import SliderSetting from './SliderSetting'
import Veksle from './Veksle'

class Terreng extends Component {
  render() {
    const {
      vertikaltOverdriv = 2.5,
      konturintervall = 50,
      visKontur = true,
      visEtikettKontur = true,
      visEtikettTopp = false,
      onUpdateLayerProp,
    } = this.props
    return (
      <React.Fragment>
        <Overskrift>Terreng</Overskrift>
        <SliderSetting
          value={vertikaltOverdriv}
          min={1}
          max={5}
          step={0.1}
          tittel="Vertikal overdrivelse"
          undertittel={vertikaltOverdriv + 'x'}
          icon={<SwapVert />}
          onChange={v => onUpdateLayerProp('vertikaltOverdriv', v)}
        />
        <Veksle
          tittel="Etiketter med høydeangivelse av topper"
          toggled={visEtikettTopp}
          onClick={() => onUpdateLayerProp('visEtikettTopp', !visEtikettTopp)}
        />
        <Overskrift>Kontur (trinndelt høydevisualisering)</Overskrift>
        <Veksle
          tittel="Konturlinjer"
          toggled={visKontur}
          onClick={() => onUpdateLayerProp('visKontur', !visKontur)}
        />
        <Veksle
          tittel="Etiketter med høydeangivelse"
          disabled={!visKontur}
          toggled={visEtikettKontur}
          onClick={() =>
            onUpdateLayerProp('visEtikettKontur', !visEtikettKontur)
          }
        />
        <SliderSetting
          tittel="Intervall mellom konturlinjer"
          undertittel={konturintervall + 'm'}
          disabled={!visKontur}
          value={konturintervall}
          min={10}
          max={1000}
          step={10}
          icon={<Landscape />}
          onChange={v => onUpdateLayerProp('konturintervall', v)}
        />
      </React.Fragment>
    )
  }
}

export default muiThemeable()(Terreng)
