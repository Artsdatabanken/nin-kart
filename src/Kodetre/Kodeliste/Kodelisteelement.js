import React from 'react'
import { Avatar } from 'material-ui'
import { ListItem } from 'material-ui/List'
import tinycolor from 'tinycolor2'
import Kodetagg from '../Kodetagg'
import PaintSwatch from './PaintSwatch'
import ColorPicker from './ColorPicker'

const rotkoder = {
  NA: { backgroundColor: '#228822', color: '#fff' },
  MI: {
    backgroundColor: '#f9e400',
    color: '#111',
  },
  BS: {
    backgroundColor: '#f9e400',
    color: '#111',
  },
  BK: {
    backgroundColor: '#f9e400',
    color: '#111',
  },
  MV: {
    backgroundColor: '#f9e400',
    color: '#111',
  },
  TX: {
    backgroundColor: '#228822',
    color: '#fff',
  },
  RL: {
    backgroundColor: '#e94f34',
    color: '#fff',
  },
  RT: {
    backgroundColor: '#e94f34',
    color: '#fff',
  },
  GO: {
    backgroundColor: '#555',
    color: '#fff',
  },
}

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

    const rotkode = parts[0]
      .replace('GEO', 'GO')
      .replace('MIV', 'MI')
      .replace('RKAT', 'RL')
      .replace('BeSys0', 'BS')
      .replace('LKM', 'MV')
      .replace('RTEM', 'RT')
    let rotmeta = rotkoder[rotkode]
    if (!rotmeta) {
      console.warn('Mangler rotkode', meta.kode, this.props.kode, rotkode)
      rotmeta = rotkoder['MV'] // use this as default for unknown codes instead of blowing up
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
              color={meta.color}
              backgroundColor={meta.backgroundColor || '#00000000'}
              src={meta.avatarbilde || meta.foto}
            >
              {meta.kode}
            </Avatar>
          }
          primaryText={
            <span>
              {(meta.navn || item.navn || item.kode) +
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
                color={meta.color}
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
              color={meta.color}
              onChange={color =>
                this.props.onUpdateLayerProp(
                  item.kode,
                  'color',
                  tinycolor(color.rgb).toRgbString()
                )
              }
              onChangeComplete={color =>
                this.props.onUpdateLayerProp(
                  this.state.ekspandertKode,
                  'color',
                  tinycolor(color.rgb).toRgbString()
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
//                color: meta.textColor,
