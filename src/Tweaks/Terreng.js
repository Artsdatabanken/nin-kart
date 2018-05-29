import { Toggle } from 'material-ui'
import muiThemeable from 'material-ui/styles/muiThemeable'
import SwapVert from 'material-ui/svg-icons/action/swap-vert'
import Landscape from 'material-ui/svg-icons/image/landscape'
import React, { Component } from 'react'
import Innstilling from './Innstilling'
import Overskrift from './Overskrift'
import SliderSetting from './SliderSetting'

class Terreng extends Component {
  render() {
    const {
      vertikaltOverdriv = 2.5,
      konturintervall = 50,
      visKontur = true,
      muiTheme,
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
        <Overskrift>Kontur (trinndelt høydevisualisering)</Overskrift>
        <Innstilling tittel="Konturlinjer">
          <span style={{ float: 'right' }}>
            <Toggle
              toggled={visKontur}
              onClick={() => onUpdateLayerProp('visKontur', !visKontur)}
            />
          </span>
          <div
            style={{
              position: 'relative',
              left: 24,
              color: muiTheme.palette.disabledColor,
            }}
          />
        </Innstilling>
        <SliderSetting
          disabled={!visKontur}
          value={konturintervall}
          min={10}
          max={1000}
          step={10}
          tittel="Intervall mellom konturlinjer"
          undertittel={konturintervall + 'm'}
          icon={<Landscape />}
          onChange={v => onUpdateLayerProp('konturintervall', v)}
        />
      </React.Fragment>
    )
  }
}

export default muiThemeable()(Terreng)
