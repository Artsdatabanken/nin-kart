import React from 'react'
import { ListItem } from 'material-ui/List'
import backend from '../../backend'
import tinycolor from 'tinycolor2'
import Kodetagg from '../Kodetagg'
import PaintSwatch from './PaintSwatch'
import ColorPicker from './ColorPicker'
import VenstreAvatar from './VenstreAvatar'

class Kodelisteelement extends React.Component {
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
            <VenstreAvatar
              utenRamme={meta.utenRamme}
              color={meta.tekstFarge}
              backgroundColor={meta.farge}
              imageSrc={backend.getFileStorageUrl(
                `bilde/avatar/40/${kode}.jpg`
              )}
              kode={meta.kode}
            />
          }
          primaryText={
            <span>
              {(tittel || meta.navn || meta.navnSci) +
                (meta.navnSci ? ` (${meta.navnSci})` : '')}
              <span style={{ display: 'inline-flex' }}>
                &nbsp;<Kodetagg
                  kode={item.kode}
                  navn={parts[1]}
                  color="#222"
                  backgroundColor="#ccc"
                />
              </span>
            </span>
          }
          secondaryText={
            this.props.areal &&
            `${
              this.props.areal
                ? (Number(this.props.areal) / 1000).toFixed(1)
                : 0
            } km² i ${this.props.antallNaturomrader || '0'} områder`
          }
          rightAvatar={
            <span style={{ display: 'inline-flex' }}>
              <PaintSwatch
                color={meta.farge}
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
              color={meta.farge}
              onChange={farge =>
                this.props.onUpdateLayerProp(
                  item.kode,
                  'farge',
                  tinycolor(farge.rgb).toRgbString()
                )
              }
            />
          )}
        </div>
      </React.Fragment>
    )
  }
}

export default Kodelisteelement
