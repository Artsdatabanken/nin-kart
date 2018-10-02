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
  størsteAreal: number,
  areal: number,
  onMouseLeave: Function,
  onMouseEnter: Function,
  onGoToCode: Function,
  erOpplyst: Boolean,
  utenFarge: Boolean,
}

class Kodelisteelement extends React.Component<Props, State> {
  shouldComponentUpdate(np) {
    if (np.areal !== this.props.areal) return true
    return false
  }

  render() {
    const {
      meta,
      kode,
      erOpplyst,
      visKode,
      onGoToCode,
      onMouseEnter,
      onMouseLeave,
      areal,
      størsteAreal,
      utenFarge,
    } = this.props
    return (
      <ListItem
        dense={true}
        key={kode}
        onClick={() => onGoToCode(kode)}
        onMouseEnter={() => onMouseEnter && onMouseEnter(kode)}
        onMouseLeave={() => onMouseLeave && onMouseLeave(kode)}
        button={true}
      >
        <VolumIndikator størsteAreal={størsteAreal} areal={areal} />
        <Bildeavatar kode={kode} />
        {!utenFarge && (
          <ListItemSecondaryAction style={{ paddingRight: 8 }}>
            <Avatar
              style={{
                width: 24,
                height: 24,
                filter: 'drop-shadow(1px 1px 1px #666)',
                backgroundColor: erOpplyst ? '#f00' : meta.farge,
              }}
            />
          </ListItemSecondaryAction>
        )}
        <ListItemText
          primary={språk(meta.tittel)}
          secondary={visKode && kode}
        />
      </ListItem>
    )
  }
}

export default Kodelisteelement
