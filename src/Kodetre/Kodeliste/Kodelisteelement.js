import React from 'react'
import { ListItem } from 'material-ui/List'
import tinycolor from 'tinycolor2'
import Kodetagg from '../Kodetagg'
import PaintSwatch from './PaintSwatch'
import ColorPicker from './ColorPicker'
import Bildeavatar from './Bildeavatar'
import muiThemeable from 'material-ui/styles/muiThemeable'

class Kodelisteelement extends React.Component {
  setFargeKode(kode, farge) {
    let farger = JSON.parse(localStorage.getItem('customColors') || '[]')
    farger = farger.filter(x => x.kode !== kode)
    farger.push({ kode: kode, farge: farge })
    localStorage.setItem('customColors', JSON.stringify(farger))
  }

  getFargeKode = () => {
    let kode = this.props.kode
    if (localStorage) {
      let customColors = localStorage.getItem('customColors')
      if (customColors) {
        let fargeElement = JSON.parse(customColors).filter(x => x.kode === kode)
        return fargeElement && fargeElement[0] && fargeElement[0].farge
          ? fargeElement[0].farge
          : this.props.meta.farge
      }
    }
    return this.props.meta.farge
  }

  undertekst(størsteAreal, areal, antall, undertittel) {
    if (undertittel) return undertittel.nb
    if (!areal) areal = 0
    if (!størsteAreal) størsteAreal = 1
    return (
      <div>
        <div
          style={{
            position: 'relative',
            width: 200,
          }}
        >
          <div
            className="sizebar"
            style={{
              marginTop: 4,
              float: 'left',
              height: 4,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              width: `${100.0 * areal / størsteAreal}%`,
              backgroundColor: this.props.muiTheme.palette.accent3Color,
            }}
          />
        </div>
        <div
          style={{
            display: 'inline',
            position: 'absolute',
            right: 52,
            float: 'right',
          }}
        >
          {false && this.prettyPrintAreal(this.props.areal)}
        </div>
      </div>
    )
  }

  prettyPrintAreal(areal) {
    if (!areal) return null
    if (areal < 1000) return (Number(areal) / 1000).toFixed(0) + ' m²'
    areal /= 1000
    if (areal < 1000) return Number(areal).toFixed(0) + ' km²'
    return Number(areal / 1000).toFixed(0) + "' km²"
  }

  render() {
    const item = this.props
    const { meta, kode, avatarUtenRamme } = this.props
    const tittel = meta.tittel
      ? Object.keys(meta.tittel).length > 1
        ? meta.tittel[item.language[0]] +
          ' (' +
          meta.tittel[item.language[1]] +
          ')'
        : meta.tittel[item.language[0]]
          ? meta.tittel[item.language[0]]
          : meta.tittel[item.language[1]]
      : kode

    let parts = []
    if (kode.indexOf('_') >= 0) {
      parts = kode.split('_')
    } else if (kode.indexOf('-') >= 0) {
      parts = kode.split('-')
    } else {
      parts = [item.kode]
    }

    return (
      <React.Fragment>
        <ListItem
          key={item.kode}
          onClick={() => this.props.onGoToCode(kode)}
          onMouseEnter={() => this.props.onMouseEnter(kode)}
          onMouseLeave={() => {
            this.props.onMouseLeave(kode)
          }}
          leftAvatar={
            <Bildeavatar utenRamme={avatarUtenRamme} kode={meta.kode} />
          }
          primaryText={
            <div>
              {(tittel || meta.navn || meta.navnSci) +
                (meta.navnSci ? ` (${meta.navnSci})` : '')}
              <div style={{ display: 'inline-flex' }}>
                {false && (
                  <Kodetagg
                    kode={item.kode}
                    navn={parts[1]}
                    color="#222"
                    backgroundColor="#ccc"
                  />
                )}
              </div>
            </div>
          }
          secondaryText={this.undertekst(
            this.props.størsteAreal,
            this.props.areal,
            this.props.antallNaturområder,
            meta.undertittel
          )}
          rightAvatar={
            <div
              style={{ display: 'inline-flex', position: 'absolute', top: 16 }}
            >
              <PaintSwatch
                color={this.getFargeKode()}
                onClick={e => {
                  e.stopPropagation()
                  this.props.onShowColorpicker(meta.kode)
                }}
              />
            </div>
          }
        />
        <div style={{ marginLeft: 56 }}>
          {this.props.erEkspandert && (
            <ColorPicker
              style={{ display: 'fixed' }}
              color={this.getFargeKode()}
              onChange={farge => {
                this.setFargeKode(item.kode, tinycolor(farge.rgb).toRgbString())
                this.props.onUpdateLayerProp(
                  item.kode,
                  'farge',
                  tinycolor(farge.rgb).toRgbString()
                )
              }}
            />
          )}
        </div>
      </React.Fragment>
    )
  }
}

export default muiThemeable()(Kodelisteelement)
