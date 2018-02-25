import React from 'react'
import { Avatar } from 'material-ui'
import { ListItem } from 'material-ui/List'
import tinycolor from 'tinycolor2'
import Kodetagg from '../Kodetagg'
import PaintSwatch from './PaintSwatch'
import ColorPicker from './ColorPicker'

class Kodelisteelement extends React.Component {
  render() {
    const item = this.props
    const meta = this.props.meta
    const kode = this.props.kode
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
          onMouseEnter={() => this.props.onMouseEnter(kode)}
          onMouseLeave={() => {
            this.props.onMouseLeave(kode)
          }}
          leftAvatar={
            <Avatar
              style={meta.utenRamme ? { borderRadius: 0 } : {}}
              color={meta.tekstFarge}
              backgroundColor={meta.farge || '#00000000'}
              src={meta.avatarbilde || meta.foto}
            >
              {meta.avatarbilde || meta.foto ? null : meta.kode}
            </Avatar>
          }
          primaryText={
            <span>
              {(meta.tittel || meta.navn || meta.navnSci) +
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
          secondaryText={`${((item.antall || 0) * 0.15).toFixed(
            1
          )} km² i ${item.antall || '0'} områder`}
          onClick={() => this.props.onGoToCode(item.kode)}
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
          {this.props.erEkspander && console.log(meta.farge)}
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
