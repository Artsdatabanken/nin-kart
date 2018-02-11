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
  TX: { backgroundColor: '#228822', color: '#fff' },
  RL: {
    backgroundColor: '#e94f34',
    color: '#fff',
  },
  RT: {
    backgroundColor: '#e94f34',
    color: '#fff',
  },
  GO: {
    backgroundColor: '#c58',
    color: '#fff',
  },
}

class Kodelisteelement extends React.Component {
  render() {
    const item = this.props
    const meta = this.props.meta
    const kode = this.props.kode
    const parts = kode.split('_') || [item.kode]
    const rotkode = parts[0]
      .replace('GEO', 'GO')
      .replace('MIV', 'MI')
      .replace('RKAT', 'RL')
      .replace('BeSys0', 'BS')
      .replace('LKM', 'MV')
      .replace('RTEM', 'RT')
    const rotmeta = rotkoder[rotkode]
    if (!rotmeta) console.log(meta.kode, this.props.kode, rotkode)
    console.log(meta)
    return (
      <ListItem
        key={item.kode}
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
        primaryText={item.navn}
        secondaryText={`${(item.antall * 0.15).toFixed(1)} km² i ${
          item.antall
        } områder`}
        onClick={() => item.onGoToCode(item.kode)}
        rightAvatar={
          <Chip>
            <Avatar
              size={32}
              style={{
                color: rotmeta.color,
                backgroundColor: rotmeta.backgroundColor,
              }}
            >
              {rotkode}
            </Avatar>
            {parts[1]}
          </Chip>
        }
      />
    )
  }
}

export default Kodelisteelement
