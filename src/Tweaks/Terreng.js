import { ListSubheader } from '@material-ui/core'
import { withTheme } from '@material-ui/core/styles'
import Landscape from '@material-ui/icons/Landscape'
import SwapVert from '@material-ui/icons/SwapVert'
import React, { Component } from 'react'
import SliderSetting from './SliderSetting'
import Veksle from './Veksle'
class Terreng extends Component {
  render() {
    const {
      kode,
      vertikaltOverdriv = 2.5,
      konturintervall = 50,
      visKontur = true,
      visEtikettKontur = true,
      visEtikettTopp = false,
      onUpdateLayerProp,
    } = this.props
    return (
      <React.Fragment>
        <ListSubheader>Terreng</ListSubheader>
        <SliderSetting
          value={vertikaltOverdriv}
          min={1}
          max={5}
          step={0.1}
          tittel="Vertikal overdrivelse"
          undertittel={vertikaltOverdriv.toFixed(1) + 'x'}
          icon={<SwapVert />}
          onChange={v => onUpdateLayerProp(kode, 'vertikaltOverdriv', v)}
        />
        <Veksle
          tittel="Etiketter med høydeangivelse av topper"
          checked={visEtikettTopp}
          onClick={() =>
            onUpdateLayerProp(kode, 'visEtikettTopp', !visEtikettTopp)
          }
        />
        <ListSubheader>Kontur (trinndelt høydevisualisering)</ListSubheader>
        <Veksle
          tittel="Konturlinjer"
          checked={visKontur}
          onClick={() => onUpdateLayerProp(kode, 'visKontur', !visKontur)}
        />
        <Veksle
          tittel="Etiketter med høydeangivelse"
          disabled={!visKontur}
          checked={visEtikettKontur}
          onClick={() =>
            onUpdateLayerProp(kode, 'visEtikettKontur', !visEtikettKontur)
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
          onChange={v => onUpdateLayerProp(kode, 'konturintervall', v)}
        />
      </React.Fragment>
    )
  }
}

export default withTheme()(Terreng)
