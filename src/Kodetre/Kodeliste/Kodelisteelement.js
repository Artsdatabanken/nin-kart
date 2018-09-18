// @flow
import {
  Avatar,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core'
import React from 'react'
import språk from '../../språk'
import Bildeavatar from './Bildeavatar'
import VolumIndikator from './VolumIndikator'

type State = {}

type Props = {
  kode: string,
  visKode: Boolean,
  meta: Object,
  avatarUtenRamme: Boolean,
  opplystKode: string,
  størsteAreal: number,
  areal: number,
  antallNaturområder: number,
  onMouseLeave: Function,
  onMouseEnter: Function,
  onGoToCode: Function,
}

class Kodelisteelement extends React.Component<Props, State> {
  onGoToCode = () => {
    this.props.onGoToCode(this.props.kode)
  }

  onMouseEnter = () => {
    this.props.onMouseEnter(this.props.kode)
  }

  render() {
    const { meta, kode, opplystKode, visKode } = this.props
    return (
      <React.Fragment>
        <ListItem
          dense={true}
          key={kode}
          onClick={this.onGoToCode}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.props.onMouseLeave}
          style={{ zIndex: 0 }}
          button={true}
        >
          <VolumIndikator
            størsteAreal={this.props.størsteAreal}
            areal={this.props.areal}
          />
          <Bildeavatar kode={kode} />
          <ListItemSecondaryAction style={{ paddingRight: 8 }}>
            <Avatar
              style={{
                width: 24,
                height: 24,
                filter: 'drop-shadow(1px 1px 1px #666)',
                backgroundColor: kode === opplystKode ? '#f00' : meta.farge,
              }}
            />
          </ListItemSecondaryAction>
          <ListItemText
            primary={språk(meta.tittel)}
            secondary={visKode && kode}
          />
        </ListItem>
      </React.Fragment>
    )
  }
}

export default Kodelisteelement
