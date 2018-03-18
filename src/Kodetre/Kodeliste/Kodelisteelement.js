import React from 'react'
import { ListItem } from 'material-ui/List'
import tinycolor from 'tinycolor2'
import Kodetagg from '../Kodetagg'
import PaintSwatch from './PaintSwatch'
import ColorPicker from './ColorPicker'
import Bildeavatar from './Bildeavatar'

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

  undertekst(areal, antall, undertittel) {
    if (areal)
      return `${
        this.props.areal ? (Number(this.props.areal) / 1000).toFixed(1) : 0
      } km² i ${antall || '0'} områder`
    if (undertittel) return this.undertittel.nb
    return null
  }

  render() {
    const item = this.props
    const meta = this.props.meta
    const kode = this.props.kode
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
            <Bildeavatar utenRamme={meta.utenRamme} kode={meta.kode} />
          }
          primaryText={
            <span>
              {(tittel || meta.navn || meta.navnSci) +
                (meta.navnSci ? ` (${meta.navnSci})` : '')}
              <span style={{ display: 'inline-flex' }}>
                {false && (
                  <Kodetagg
                    kode={item.kode}
                    navn={parts[1]}
                    color="#222"
                    backgroundColor="#ccc"
                  />
                )}
              </span>
            </span>
          }
          secondaryText={this.undertekst(
            this.props.areal,
            this.props.antallNaturområder,
            meta.undertittel
          )}
          rightAvatar={
            <span
              style={{ display: 'inline-flex', position: 'absolute', top: 16 }}
            >
              <PaintSwatch
                color={this.getFargeKode()}
                onClick={e => {
                  e.stopPropagation()
                  this.props.onShowColorpicker(meta.kode)
                }}
              />
            </span>
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

export default Kodelisteelement
