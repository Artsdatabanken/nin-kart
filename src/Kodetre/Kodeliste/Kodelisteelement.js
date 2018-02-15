import React from 'react'
import { Chip, Avatar } from 'material-ui'
import { ListItem } from 'material-ui/List'

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
      <ListItem
        key={item.kode}
        onMouseEnter={() => this.props.onMouseEnter(kode)}
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
          (meta.navn || item.navn || item.kode) +
          (meta.navnSci ? ` (${meta.navnSci})` : '')
        }
        secondaryText={`${((item.antall || 0) * 0.15).toFixed(
          1
        )} km² i ${item.antall || '0'} områder`}
        onClick={() => this.props.onGoToCode(item.kode)}
        rightAvatar={
          <span style={{ display: 'inline-flex' }}>
            <Avatar
              size={32}
              style={{
                color: meta.textColor,
                backgroundColor: meta.color,
                fontSize: 14,
              }}
            >
              {rotkode}
            </Avatar>
            <Chip>{parts[1]}</Chip>
          </span>
        }
      />
    )
  }
}

export default Kodelisteelement
