// @flow
import {
  Avatar,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core'
import { withStyles, withTheme } from '@material-ui/core/styles'
import React from 'react'
import språk from '../../språk'
import Bildeavatar from './Bildeavatar'
import PaintSwatch from './PaintSwatch'
import VolumIndikator from './VolumIndikator'

const styles = {
  disabled: {
    backgroundColor: '#ddd',
  },
}

type State = {}

type Props = {
  kode: string,
  visKode: Boolean,
  meta: Object,
  avatarUtenRamme: Boolean,
  erOpplyst: Boolean,
  størsteAreal: number,
  areal: number,
  antallNaturområder: number,
  theme: Object,
  onMouseLeave: Function,
  onMouseEnter: Function,
  onGoToCode: Function,
}

class Kodelisteelement extends React.Component<Props, State> {
  render() {
    const { meta, kode, avatarUtenRamme, erOpplyst, visKode } = this.props
    return (
      <React.Fragment>
        <ListItem
          key={kode}
          onClick={() => this.props.onGoToCode(kode)}
          onMouseEnter={() => this.props.onMouseEnter(kode)}
          onMouseLeave={() => this.props.onMouseLeave()}
          style={{ zIndex: 0 }}
          button={true}
        >
          <VolumIndikator
            størsteAreal={this.props.størsteAreal}
            areal={this.props.areal}
            theme={this.props.theme}
          />
          <Bildeavatar utenRamme={avatarUtenRamme} kode={kode} />
          <ListItemSecondaryAction>
            <PaintSwatch color={erOpplyst ? '#f00' : meta.farge} />
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

export default withStyles(styles)(withTheme()(Kodelisteelement))
